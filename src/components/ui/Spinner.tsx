import Image from "next/image";
import React from "react";

const spinnerStyle: React.CSSProperties = {
  position: "absolute",
  width: "6rem",
  height: "6rem",
  border: "3px solid transparent",
  borderTopColor: "#0C6AFF", // Replace with your primary color
  borderBottomColor: "#0C6AFF",
  borderRadius: "50%",
  animation: "spin 2s ease infinite",
};

const imageStyle: React.CSSProperties = {
  boxSizing: "border-box",
  position: "absolute",
  left: "1.5rem",
  top: "1.5rem",
  width: "3rem",
  height: "3rem",
};

const containerStyle: React.CSSProperties = {
  textAlign: "center",
  width: "6rem",
  position: "relative",
};

const textStyle: React.CSSProperties = {
  fontSize: "0.875rem",
  paddingTop: "7rem",
};

const keyframes = `
@keyframes spin {
  50% {
    transform: rotate(360deg) scale(0.7, 0.7);
    border-width: 8px;
  }
  100% {
    transform: rotate(720deg) scale(1, 1);
    border-width: 3px;
  }
}
`;

const Spinner: React.FC<{ label?: string }> = ({ label }) => (
  <div style={containerStyle}>
    <style>{keyframes}</style>
    <div style={{ position: "relative" }}>
      <Image
        style={imageStyle}
        src="/logo.png"
        alt="Meetwith"
        width={48}
        height={48}
      />
      <div style={spinnerStyle}></div>
    </div>
    <div style={textStyle}>{label !== undefined ? label : "Loading..."}</div>
  </div>
);

export default Spinner;
