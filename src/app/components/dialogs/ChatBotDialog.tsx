import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ThemeProvider,
  TextField,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import palette from "../../config/Colours";
import React, { useState } from "react";
import "./ChatBotDialog.css";
import ChatMessage from "../ChatMessage";

function ChatBotDialog(props: any) {
  const { open, handleClose } = props;
  const theme = createTheme(palette);
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="scroll-dialog-title">Theo Ticket</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description">
            <div className="chatBox">
              <p>hey</p>
              <p>hey</p>
              <p>hey</p>
              <p>hey</p>
              <ChatMessage message="TheoTicket" name="TheoTicket" />
            </div>
            <br />
            <div className="userInput">
              <TextField
                className="userText"
                variant="outlined"
                label="Nachricht für Theo..."
              />
              <Button className="sendButton" variant="contained">
                Senden
              </Button>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Schließen</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default ChatBotDialog;
