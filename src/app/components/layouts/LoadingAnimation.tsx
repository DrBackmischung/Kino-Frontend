import React from "react";
import Loader from "react-loader-spinner";

function LoadingAnimation() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Loader type="MutatingDots" color="#000000" height={100} width={100} />
    </div>
  );
}

export default LoadingAnimation;
