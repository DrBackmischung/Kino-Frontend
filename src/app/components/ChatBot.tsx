import React, { useState } from "react";
import { Button } from "@mui/material";
import "./ChatBot.css";
import ChatBotDialog from "./dialogs/ChatBotDialog";

function ChatBot(props: any) {
  const [open, setOpen] = useState(false);
  const onButtonPressed = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        className="wholeContainer"
        variant="contained"
        onClick={onButtonPressed}
      >
        ChatBot
      </Button>
      <ChatBotDialog open={open} handleClose={handleClose} />
    </>
  );
}

export default ChatBot;
