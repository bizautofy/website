import { ImageResponse } from "next/og";
import { brand } from "@/lib/content";

// Route segment config
export const runtime = "edge";
export const alt = `${brand.name} — ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          background:
            "radial-gradient(circle at 20% 20%, rgba(167,139,250,0.45), transparent 60%), radial-gradient(circle at 80% 80%, rgba(255,184,76,0.35), transparent 60%), #08061a",
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
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "linear-gradient(135deg,#a78bfa,#ffb84c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#08061a",
              fontWeight: 800,
            }}
          >
            b
          </div>
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
            Look as good online as you are{" "}
            <span
              style={{
                background: "linear-gradient(120deg,#a78bfa,#c4b5fd,#ffb84c)",
                backgroundClip: "text",
                color: "transparent",
                fontStyle: "italic",
                fontWeight: 600,
                marginLeft: 16,
              }}
            >
              in person.
            </span>
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
