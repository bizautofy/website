import { ImageResponse } from "next/og";
import { brand, hero } from "@/lib/content";

// Route segment config
export const runtime = "edge";
export const alt = `${brand.name} — ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  // Drive the headline from the Hero copy so the social card never drifts
  // out of sync with the site. Splits on the highlighted phrase to keep the
  // same italic accent treatment (flat primary color, matches the UI).
  const [headlineBefore, headlineAfter] = hero.title.split(hero.highlight);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          background: "#08061a",
          color: "#f0f0fa",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: -0.5,
          }}
        >
          {/*
            Brand mark: same woven vesica as /public/logo-mark.svg and the
            <Logo /> component. Keeping the geometry inline (not loading the
            file) so this OG route works at the edge without extra fetches.
          */}
          <svg
            width={56}
            height={56}
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              stroke="#A78BFA"
              strokeWidth={11}
              fill="none"
              strokeLinecap="round"
            >
              <path d="M 38 24 A 36 36 0 0 1 38 104" />
            </g>
            <g
              stroke="#FFC371"
              strokeWidth={11}
              fill="none"
              strokeLinecap="round"
            >
              <path d="M 90 24 A 36 36 0 0 0 90 104" />
            </g>
            <g
              stroke="#A78BFA"
              strokeWidth={11}
              fill="none"
              strokeLinecap="round"
            >
              <path d="M 38 24 A 40 40 0 0 1 78 64" />
            </g>
          </svg>
          bizautofy
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 1000,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {headlineBefore}
            <span
              style={{
                color: "#a78bfa",
                fontStyle: "italic",
                fontWeight: 600,
              }}
            >
              {hero.highlight}
            </span>
            {headlineAfter}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#a8a8c0",
          }}
        >
          <span>{brand.tagline}</span>
          <span>bizautofy.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
