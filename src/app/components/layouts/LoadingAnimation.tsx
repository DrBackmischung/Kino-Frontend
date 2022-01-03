import React from "react";
import Loader from "react-loader-spinner";
import "./LoadingAnimation.css";

function LoadingAnimation() {
  return (
    <div className="loadingContainer">
      <Loader type="MutatingDots" color="#000000" height={100} width={100} />
    </div>
  );
}

export default LoadingAnimation;
