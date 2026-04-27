"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { submitContactForm } from "@/app/actions/contact";
import type { ContactState } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

type Plan = "general" | "discovery" | "build" | "run" | "custom" | "founding";
const PLANS: Array<{ value: Plan; label: string }> = [
  { value: "general", label: "General inquiry" },
  { value: "discovery", label: "Book a Discovery & Audit ($500)" },
  { value: "build", label: "Talk about a Build" },
  { value: "run", label: "Retainer / ongoing Run support" },
  { value: "custom", label: "Custom scope" },
  { value: "founding", label: "Founding customer" },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Sending…
        </>
      ) : (
        <>
          Send message
          <ArrowRight className="h-4 w-4" />
        </>
      )}
    </Button>
  );
}

export function ContactForm() {
  const params = useSearchParams();
  const planFromUrl = (params.get("plan") || "") as Plan | "";
  const foundingFromUrl = params.get("founding") === "true";
  const serviceFromUrl = params.get("service") || "";

  const initialPlan: Plan =
    foundingFromUrl
      ? "founding"
      : PLANS.some((p) => p.value === planFromUrl)
      ? (planFromUrl as Plan)
      : "general";

  const [state, formAction] = React.useActionState<
    ContactState | undefined,
    FormData
  >(submitContactForm, undefined);

  // Anti-bot signal: stamp the time the form is mounted on the client.
  // We let React stamp it once on the client only — it never re-syncs from the
  // server, so SSR remains deterministic and there is no hydration mismatch.
  const [ts, setTs] = React.useState<number>(0);
  React.useEffect(() => {
    // Set once on mount, and again after a successful submit so the next
    // submission gets a fresh timestamp.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTs(Date.now());
  }, [state?.ok]);

  if (state?.ok) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-6"
      >
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-base font-semibold tracking-tight text-foreground">
            Message received.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{state.message}</p>
        </div>
      </div>
    );
  }

  const initialMessage = serviceFromUrl
    ? `I'd like to talk about: ${serviceFromUrl.replace(/-/g, " ")}.\n\n`
    : "";

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <input type="hidden" name="ts" value={ts} />
      {/*
        Honeypot field. Real users never see or interact with it; bots and
        naive form-filling automation tend to fill every field they can find.
        Implementation notes:
        - Field is named `hp_x` (non-semantic) so password managers / browser
          autofill heuristics do not match it. Crucially, we do NOT label it
          "Website" — many engines will helpfully fill any field literally
          labeled "website" with the current page URL, which would create a
          false positive and silently drop legitimate messages.
        - Wrapped in a position:absolute, off-screen, zero-size container so
          it cannot be tab-focused or visually filled.
        - aria-hidden + tabIndex=-1 keep it out of the accessibility tree.
        - autoComplete="off" + name designed to defeat heuristic autofill.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden opacity-0"
      >
        <input
          type="text"
          name="hp_x"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
          aria-hidden="true"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldRow
          id="name"
          label="Your name"
          error={state?.fieldErrors?.name}
        >
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Jordan Smith"
            required
            maxLength={80}
            aria-invalid={!!state?.fieldErrors?.name}
          />
        </FieldRow>

        <FieldRow
          id="email"
          label="Email"
          error={state?.fieldErrors?.email}
        >
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@yourbusiness.com"
            required
            maxLength={120}
            aria-invalid={!!state?.fieldErrors?.email}
          />
        </FieldRow>
      </div>

      <FieldRow
        id="business"
        label="Business name"
        hint="Optional — helps us prep before we talk."
        error={state?.fieldErrors?.business}
      >
        <Input
          id="business"
          name="business"
          autoComplete="organization"
          placeholder="Bullnose Tile"
          maxLength={120}
          aria-invalid={!!state?.fieldErrors?.business}
        />
      </FieldRow>

      <FieldRow id="plan" label="What are you interested in?">
        <select
          id="plan"
          name="plan"
          defaultValue={initialPlan}
          className="flex h-11 w-full appearance-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-primary/50"
        >
          {PLANS.map((p) => (
            <option key={p.value} value={p.value} className="bg-background">
              {p.label}
            </option>
          ))}
        </select>
      </FieldRow>

      <FieldRow
        id="message"
        label="What's going on?"
        hint="Where are you stuck? What would change everything if it just worked?"
        error={state?.fieldErrors?.message}
      >
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={4000}
          defaultValue={initialMessage}
          placeholder="Tell us about your business, what you're trying to fix, and any tools you already use."
          aria-invalid={!!state?.fieldErrors?.message}
        />
      </FieldRow>

      {state && !state.ok && state.message && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
          <p>{state.message}</p>
        </div>
      )}

      <SubmitButton />

      <p className="text-xs text-muted-foreground">
        By sending this you agree to receive a reply from us — that&apos;s it.
        We never sell or share your info.
      </p>
    </form>
  );
}

interface FieldRowProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

function FieldRow({ id, label, hint, error, children }: FieldRowProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p className={cn("text-xs text-destructive")}>{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground/80">{hint}</p>
      ) : null}
    </div>
  );
}
