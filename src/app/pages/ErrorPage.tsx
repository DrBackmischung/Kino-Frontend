import React from "react";
import { IllustratedMessage } from "@adobe/react-spectrum";
import NotFound from "@spectrum-icons/illustrations/NotFound";
import { Heading, Content } from "@adobe/react-spectrum";
import "./ErrorPage.css";

function ErrorPage() {
  return (
    <div className="errorPageContainer">
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
