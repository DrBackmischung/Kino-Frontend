import React from "react";
import Loader from "react-loader-spinner";
import "./LoadingAnimation.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import palette from "../../config/Colours";

const theme = createTheme(palette)
  
function LoadingAnimation() {
  return (
    <ThemeProvider theme={theme}>
      <div className="loadingContainer">
        <Loader type="MutatingDots" color="secondary" height={100} width={100} />
      </div>
    </ThemeProvider>
  );
}

export default LoadingAnimation;
