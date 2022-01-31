import React, { useState } from "react";
import "./ChatMessage.css";
import { useNavigate } from "react-router-dom";

function ChatMessage(props: any) {
  const { message, align, navigateState, navigateTo, handleDialogClose } =
    props;
  const navigate = useNavigate();
  const [messageCss] = useState(`messageContainer${align}`);
  const navigateToLink = (e: any) => {
    e.preventDefault();
    handleDialogClose();
    switch (navigateTo) {
      case "/DetailsPage":
        navigate(`${navigateTo}`, { state: { movieId: navigateState } });
        break;
    }
  };
  return (
    <div className={messageCss}>
      <p className="messageText">{`${message} `}</p>
      {navigateTo === undefined ? null : (
        <p className="myHyperLink" onClick={(e) => navigateToLink(e)}>
          Mehr erfahren!
        </p>
      )}
    </div>
  );
}

export default ChatMessage;
