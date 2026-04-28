"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { contactLimiter } from "@/lib/rate-limit";
import {
  contactSchema,
  type ContactPayload,
  type ContactState,
} from "@/lib/contact-schema";

const FROM = process.env.CONTACT_FROM_EMAIL || "Bizautofy <hello@bizautofy.com>";
const TO = process.env.CONTACT_TO_EMAIL || "hello@bizautofy.com";

/**
 * Get the best-effort client IP from request headers.
 * Used only for rate-limit keying — never logged.
 */
async function getClientIp(): Promise<string> {
  const h = await headers();
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  return (
    h.get("x-real-ip") ||
    h.get("cf-connecting-ip") ||
    "unknown"
  );
}

/**
 * Escape a string for safe interpolation into HTML email content.
 * We never trust user-submitted text in HTML output.
 */
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderEmailHtml(payload: ContactPayload): string {
  const rows: Array<[string, string]> = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Business", payload.business || "—"],
    ["Interested in", payload.plan ?? "general"],
  ];
  const meta = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#888;font-size:12px;">${escapeHtml(
          k
        )}</td><td style="padding:6px 0;color:#111;font-size:14px;"><strong>${escapeHtml(
          v
        )}</strong></td></tr>`
    )
    .join("");
  const message = escapeHtml(payload.message).replace(/\n/g, "<br/>");
  return `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#f6f6f9;padding:24px;">
<div style="max-width:560px;margin:auto;background:#fff;border:1px solid #eee;border-radius:14px;padding:24px;">
  <h1 style="margin:0 0 4px;font-size:18px;color:#111;">New Bizautofy inquiry</h1>
  <p style="margin:0 0 16px;color:#666;font-size:13px;">Submitted via the website contact form.</p>
  <table style="border-collapse:collapse;">${meta}</table>
  <hr style="border:none;border-top:1px solid #eee;margin:18px 0;"/>
  <div style="white-space:pre-wrap;color:#111;font-size:14px;line-height:1.6;">${message}</div>
</div>
</body></html>`;
}

function renderEmailText(payload: ContactPayload): string {
  return [
    `New Bizautofy inquiry`,
    ``,
    `Name:     ${payload.name}`,
    `Email:    ${payload.email}`,
    `Business: ${payload.business || "—"}`,
    `Plan:     ${payload.plan ?? "general"}`,
    ``,
    `Message:`,
    payload.message,
  ].join("\n");
}

export async function submitContactForm(
  _prev: ContactState | undefined,
  formData: FormData
): Promise<ContactState> {
  // Anti-bot: instant submits (< 1.5s after render) are almost always bots.
  const ts = Number(formData.get("ts"));
  if (Number.isFinite(ts) && ts > 0 && Date.now() - ts < 1500) {
    console.info("[contact] dropped: anti-bot timestamp (instant submit)");
    return { ok: true, message: "Thanks — we'll be in touch shortly." };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    business: formData.get("business"),
    plan: formData.get("plan"),
    message: formData.get("message"),
    hp_x: formData.get("hp_x"),
    ts: formData.get("ts"),
  });

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactPayload | undefined;
      if (key && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const payload = parsed.data;

  // Honeypot: pretend success so bots don't retry.
  if (payload.hp_x && payload.hp_x.length > 0) {
    console.info("[contact] dropped: honeypot tripped");
    return { ok: true, message: "Thanks — we'll be in touch shortly." };
  }

  // Per-IP rate limit
  const ip = await getClientIp();
  const limit = await contactLimiter.limit(ip);
  if (!limit.success) {
    console.info("[contact] dropped: rate limit");
    return {
      ok: false,
      message:
        "We received a few messages from your network already. Please try again in a few minutes, or email us directly.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      `[contact] RESEND_API_KEY not set; NODE_ENV=${process.env.NODE_ENV}`
    );
    // Dev fallback: log a redacted preview to the server console only.
    // PII (full email/message) is NEVER logged.
    if (process.env.NODE_ENV !== "production") {
      console.info(
        `[contact] (dev) message from ${payload.name} (${payload.email
          .split("@")[0]
          ?.slice(0, 2)}***) — RESEND_API_KEY not set, skipping send.`
      );
      return {
        ok: true,
        message:
          "Thanks — we got your message. (Dev mode: email send is disabled until RESEND_API_KEY is configured.)",
      };
    }
    return {
      ok: false,
      message:
        "We could not deliver your message right now. Please email us directly at hello@bizautofy.com.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const subject = `New Bizautofy inquiry — ${payload.name}${
      payload.business ? ` (${payload.business})` : ""
    }`;
    const result = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: payload.email,
      subject,
      html: renderEmailHtml(payload),
      text: renderEmailText(payload),
    });
    // Resend's SDK returns { data: { id }, error } rather than throwing on
    // non-2xx responses. Log the outcome (without PII) so we can diagnose
    // delivery problems from Vercel runtime logs.
    if (result.error) {
      console.error(
        `[contact] resend rejected: name=${result.error.name} msg=${result.error.message}`
      );
      return {
        ok: false,
        message:
          "We could not deliver your message right now. Please email us directly at hello@bizautofy.com.",
      };
    }
    console.info(
      `[contact] resend accepted: id=${result.data?.id ?? "unknown"} from=${FROM} to=${TO}`
    );
  } catch (err) {
    // Network or unexpected SDK error.
    console.error(
      `[contact] resend threw: ${err instanceof Error ? err.message : String(err)}`
    );
    return {
      ok: false,
      message:
        "We could not deliver your message right now. Please email us directly at hello@bizautofy.com.",
    };
  }

  return {
    ok: true,
    message:
      "Thanks — your message is in. We'll reply within one business day.",
  };
}
