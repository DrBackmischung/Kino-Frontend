import React, { useEffect } from "react";
import { IllustratedMessage } from "@adobe/react-spectrum";
import NotFound from "@spectrum-icons/illustrations/NotFound";
import { Heading, Content } from "@adobe/react-spectrum";
import "./ErrorPage.css";
import { useQuery } from "react-query";
import APIUrl from "../config/APIUrl";
import LoadingAnimation from "../components/layouts/LoadingAnimation";

function ErrorPage(props: any) {
  const { errorCode } = props;
  const apiUrl = `${APIUrl.apiUrl}/error/`;

  const errorData = useQuery("errorData", () =>
    fetch(`${apiUrl}${errorCode}`).then((res) => res.json())
  );
  useEffect(() => {
    errorData.refetch();
  }, [errorCode]);
  if (errorData?.isError) {
    return (
      <div className="errorPageContainer">
        <IllustratedMessage>
          <NotFound />
          <Heading>Ein Fehler ist aufgetreten!</Heading>
          <Content>
            Bitte versuche die Seite neu zu laden oder wende dich an einen
            Admin!
          </Content>
        </IllustratedMessage>
      </div>
    );
  }
  if (errorData?.isLoading) {
    return <LoadingAnimation />;
  }
  return (
    <div className="errorPageContainer">
      <IllustratedMessage>
        <NotFound />
        <Heading>{`${errorCode}: ${errorData?.data?.name}`}</Heading>
        <Content>{`${errorData?.data?.description}`}</Content>
      </IllustratedMessage>
    </div>
  );
}

export default ErrorPage;
