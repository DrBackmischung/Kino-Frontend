import React, { useState } from "react";
import { Button } from "@mui/material";
import "./ChatBot.css";
import ChatBotDialog from "./dialogs/ChatBotDialog";

function ChatBot(props: any) {
  const { userData } = props;
  const [open, setOpen] = useState(false);
  const onButtonPressed = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="wholeContainer">
      <Button variant="contained" onClick={onButtonPressed} id="chatBot-Button">
        ChatBot
      </Button>
      <ChatBotDialog
        open={open}
        handleClose={handleClose}
        userData={userData}
      />
    </div>
  );
}

export default ChatBot;
