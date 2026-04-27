import { z } from "zod";

/**
 * Shared zod schema for the contact form.
 * Used by both the client (react-hook-form) and the server action.
 *
 * Notes on validation:
 * - All free-text fields enforce length caps to limit DoS potential.
 * - We reject control characters (CR/LF/NULL) in single-line fields to prevent
 *   header / log injection.
 * - `website` is a hidden honeypot — bots tend to fill every field.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please tell us your name.")
    .max(80, "That name is too long.")
    .regex(/^[^\r\n\u0000]+$/, "Invalid characters in name."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please use a valid email address.")
    .max(120, "Email is too long."),
  business: z
    .string()
    .trim()
    .max(120, "Business name is too long.")
    .regex(/^[^\r\n\u0000]*$/, "Invalid characters in business name.")
    .optional()
    .or(z.literal("")),
  plan: z
    .enum(["starter", "growth", "pro", "custom", "founding", "general"])
    .optional()
    .default("general"),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least 10 characters.")
    .max(4000, "That is more than we can read at once. Trim it down a bit."),
  // Honeypot: real users leave this empty. Bots tend to fill every field.
  // Field name intentionally non-semantic so password managers / browser
  // autofill engines do not match it (many will fill any field literally
  // labeled "Website" with the current page URL, which would create a false
  // positive and silently drop the message).
  hp_x: z
    .string()
    .max(0, "Spam detected.")
    .optional()
    .default(""),
  // Honest consent record (timestamp form was rendered; helps detect botted instant-submits)
  ts: z.coerce.number().optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactPayload = z.output<typeof contactSchema>;

export type ContactState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactPayload, string>>;
};
