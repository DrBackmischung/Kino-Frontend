import React from "react";
import SignUp from "../components/SignUp";
import { Container } from "@mui/material";

function UserRegistrationPage(props: any) {
  const { setUser } = props;
  return (
    <Container>
      <SignUp setUser={setUser} />
    </Container>
  );
}

export default UserRegistrationPage;
