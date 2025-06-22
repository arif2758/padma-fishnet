import { Spin } from "antd";
import React from "react";

const LoadingSpin = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        transform: "translateY(-20%)",
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default LoadingSpin;
 