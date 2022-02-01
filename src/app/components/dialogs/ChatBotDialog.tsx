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
    message: `Versuche Befehle wie "Zeig mir alle Filme" oder "Vorstellungen", zu dem Shows sehen möchtest!`,
    align: "Right",
  },
];

function ChatBotDialog(props: any) {
  const { open, handleClose, userData } = props;
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState(welcomeMessage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(200);
  const theme = createTheme(palette);
  const APIUrlChat = `https://wi2020seb-cinema-theo.azurewebsites.net/query`;

  const sendMessageToChatBot = async (userMessage: any) => {
    setLoading(true);
    const messageToFetch = userMessage.replace(" ", "_");
    const response = await fetch(`${APIUrlChat}/${messageToFetch}`);
    if (!response.ok) {
      setError(response.status);
      return;
    }
    const data = await response.json();
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
        console.log(data.content);
        setMessages((prevVal) => [
          ...prevVal,
          {
            message: `Ich habe folgendes zu "${userMessage}" gefunden: `,
            align: "Right",
            link: `${data.content}`,
          },
        ]);
        break;
      case "MOVIELIST":
        setMessages((prevVal) => [
          ...prevVal,
          {
            message: `Ich habe folgende Filme zu "${userMessage}" gefunden: `,
            align: "Right",
            navigateTo: "/DetailsPage",
            movieList: data.content,
          },
        ]);
        break;
      case "SHOWLIST":
        setMessages((prevVal) => [
          ...prevVal,
          {
            message: `Ich habe folgende Vorführungen zu "${userMessage}" gefunden: `,
            align: "Right",
            navigateTo: "/DetailsPage",
            showList: data.content,
            userData: userData,
          },
        ]);
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
    handleClose();
  };
  if (error !== 200) {
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
              <ErrorPage errorCode={error} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClosePressed}>Schließen</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
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
                    link={item.link}
                    movieList={item.movieList}
                    showList={item.showList}
                    userData={item.userData}
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
