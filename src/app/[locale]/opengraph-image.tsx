import { ImageResponse } from "next/og";

export const alt = "Pål Gøran Stolt-Larsen Pettersen — Sommelier & Vinkelner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isNorwegian = locale === "no";

  const heading = isNorwegian
    ? "Vin er ikke bare i glasset."
    : "Wine is not just in the glass.";
  const role = isNorwegian
    ? "F&B MANAGER · SOMMELIER · SKJOLDEN HOTELL"
    : "F&B MANAGER · SOMMELIER · SKJOLDEN HOTEL";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 90px",
          background:
            "linear-gradient(135deg, #1a0e08 0%, #2c1810 55%, #1a0e08 100%)",
          fontFamily: "serif",
          color: "#f5f0e8",
          position: "relative",
        }}
      >
        {/* top gold accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "#d4a853",
          }}
        />

        {/* header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            color: "#d4a853",
            fontSize: 20,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex" }}>PÅL GØRAN</div>
          <div style={{ display: "flex" }}>
            {isNorwegian ? "SOMMELIER · VINKELNER" : "SOMMELIER · WINE DIRECTOR"}
          </div>
        </div>

        {/* center heading */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 32,
            maxWidth: 1020,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 88,
              lineHeight: 1.02,
              fontWeight: 400,
              color: "#f5f0e8",
              letterSpacing: "-0.01em",
            }}
          >
            {heading}
          </div>
          <div
            style={{
              display: "flex",
              height: 2,
              width: 120,
              background: "#d4a853",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontStyle: "italic",
              color: "#ede8dc",
              opacity: 0.85,
              maxWidth: 900,
            }}
          >
            Pål Gøran Stolt-Larsen Pettersen
          </div>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            color: "#c4794a",
            fontSize: 18,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex" }}>{role}</div>
          <div style={{ display: "flex", color: "#d4a853" }}>
            {isNorwegian ? "SOGNEFJORDEN" : "SOGNEFJORD"}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
