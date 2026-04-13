import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
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
          fontSize: 44,
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
