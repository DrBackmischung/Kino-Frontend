import React from "react";
import { IllustratedMessage } from "@adobe/react-spectrum";
import NotFound from "@spectrum-icons/illustrations/NotFound";
import { Heading, Content } from "@adobe/react-spectrum";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import palette from "../config/Colours";
import "./ErrorPage.css";

const theme = createTheme(palette)
  
function ErrorPage() {
  return (
    <ThemeProvider theme={theme}>
      <div className="errorPageContainer">
        <IllustratedMessage>
          <NotFound />
          <Heading>Ein Fehler ist aufgetreten!</Heading>
          <Content>
            Bitte versuche die Seite neu zu laden oder wende dich an einen Admin!
          </Content>
        </IllustratedMessage>
      </div>
    </ThemeProvider>
  );
}

export default ErrorPage;
