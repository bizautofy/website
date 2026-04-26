import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Per-IP sliding-window rate limit for the contact form.
 *
 * Behavior:
 * - When `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set, we use
 *   a real distributed rate limiter (5 requests / 10 min per IP).
 * - When env vars are missing (e.g. local dev without Upstash), we fall back
 *   to an in-memory limiter so the form still works locally.
 *
 * The in-memory fallback is intentionally simple. It is NOT safe across
 * serverless instances, so production deployments MUST configure Upstash.
 */

const WINDOW = "10 m" as const;
const MAX = 5;

let limiter: { limit: (id: string) => Promise<{ success: boolean }> };

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (url && token) {
  const redis = new Redis({ url, token });
  const realLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(MAX, WINDOW),
    analytics: false,
    prefix: "bizautofy/contact",
  });
  limiter = {
    limit: async (id: string) => {
      const r = await realLimiter.limit(id);
      return { success: r.success };
    },
  };
} else {
  // In-memory fallback. Acceptable only for local dev.
  const buckets = new Map<string, number[]>();
  const windowMs = 10 * 60 * 1000;
  limiter = {
    limit: async (id: string) => {
      const now = Date.now();
      const arr = (buckets.get(id) || []).filter((t) => now - t < windowMs);
      if (arr.length >= MAX) {
        buckets.set(id, arr);
        return { success: false };
      }
      arr.push(now);
      buckets.set(id, arr);
      return { success: true };
    },
  };
}

export const contactLimiter = limiter;
