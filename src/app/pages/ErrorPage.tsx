import React from "react";
import { IllustratedMessage } from "@adobe/react-spectrum";
import NotFound from "@spectrum-icons/illustrations/NotFound";
import { Heading, Content } from "@adobe/react-spectrum";

function ErrorPage() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <IllustratedMessage>
        <NotFound />
        <Heading>Ein Fehler ist aufgetreten!</Heading>
        <Content>
          Bitte versuche die Seite neu zu laden oder wende dich an einen Admin!
        </Content>
      </IllustratedMessage>
    </div>
  );
}

export default ErrorPage;
