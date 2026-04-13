import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a0e08",
          color: "#d4a853",
          fontFamily: "serif",
          fontSize: 124,
          fontWeight: 400,
          fontStyle: "italic",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        P
      </div>
    ),
    { ...size },
  );
}
