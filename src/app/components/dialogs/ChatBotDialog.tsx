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
import ErrorPage from "../../pages/ErrorPage";

const welcomeMessage = [
  {
    message: "Hallo ich bin Theo das Ticket, wie kann ich dir behilflich sein?",
    align: "Right",
  },
  {
    message: `Versuche Befehle wie "Shrek 3" oder ein Datum, zu dem Shows sehen möchtest!`,
    align: "Right",
  },
];

function ChatBotDialog(props: any) {
  const { open, handleClose } = props;
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState(welcomeMessage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const theme = createTheme(palette);
  const APIUrlChat = `https://wi2020seb-cinema-theo.azurewebsites.net/query`;

  const sendMessageToChatBot = async (userMessage: any) => {
    setLoading(true);
    const messageToFetch = userMessage.replace(" ", "_");
    /*const response = await fetch(`${APIUrlChat}/${messageToFetch}`);
    if (!response.ok) {
      setError(true);
      return;
    }
    const data = await response.json(); */
    const data = {
      type: "MOVIE",
      content: {
        id: "c3437d13-0374-414f-9446-acdd8ae97f47",
        title: "Shrek 3",
        language: "Deutsch",
        duration: 200.0,
        director: "Mathis Neunzig",
        description: "Grün und hässlich",
        pictureLink:
          "https://www.merkur.de/bilder/2021/07/15/90875184/26566547-burmilla-katze-rasse-kitten-1Rec.jpg",
        fsk: 0,
      },
    };
    switch (data?.type) {
      case "MOVIE":
        setMessages((prevVal) => [
          ...prevVal,
          {
            message: `Ich habe folgendes zu "${userMessage}" gefunden: Der gesuchte Film ${data.content.title} vom Regisseur ${data.content.director} handelt von ${data.content.description}, Dauert ${data.content.duration} Minuten und ist ab ${data.content.fsk} Jahren freigegeben.`,
            align: "Right",
            navigateState: `${data.content.id}`,
            navigateTo: "/DetailsPage",
          },
        ]);
        break;
      case "STRING":
        setMessages((prevVal) => [
          ...prevVal,
          {
            message: `${data.content}`,
            align: "Right",
          },
        ]);
        break;
      case "LINK":
        break;
      case "MOVIELIST":
        break;
      case "SHOW":
        break;
    }
    setLoading(false);
  };

  const sendUserMessage = () => {
    if (userInput.length > 1) {
      setMessages((prevVal) => [
        ...prevVal,
        { message: userInput, align: "Left" },
      ]);
      sendMessageToChatBot(userInput);
      setUserInput("");
    }
  };
  const sendUserMessageKey = (e: any) => {
    if (e?.key === "Enter") {
      sendUserMessage();
    }
  };
  const sendUserMessageButton = () => {
    sendUserMessage();
  };
  const onClosePressed = () => {
    setMessages(welcomeMessage);
    handleClose();
  };
  if (error) {
    return <ErrorPage />;
  }
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
              <div className="chatBoxInner">
                {messages?.map((item: any) => (
                  <ChatMessage
                    align={item.align}
                    message={item.message}
                    navigateTo={item.navigateTo}
                    navigateState={item.navigateState}
                    handleDialogClose={handleClose}
                  />
                ))}
              </div>
            </div>
            <br />
            <div className="userInput">
              <TextField
                id="userText"
                variant="outlined"
                label="Nachricht für Theo Ticket..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                fullWidth
                onKeyPress={(e) => sendUserMessageKey(e)}
                disabled={loading}
              />
              <Button
                fullWidth
                id="sendButton"
                variant="contained"
                onClick={sendUserMessageButton}
              >
                Senden
              </Button>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClosePressed}>Schließen</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default ChatBotDialog;
