import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import "./ChatMessage.css";
import palette from "../config/Colours";

function ChatMessage(props: any) {
  const { name, message, align } = props;
  const theme = createTheme(palette);
  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <strong>{name}: </strong>
        <p className="message">{message}</p>
      </div>
    </ThemeProvider>
  );
}

export default ChatMessage;
