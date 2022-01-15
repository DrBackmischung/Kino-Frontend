import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { useState } from "react";
import ManageAdminMovie from "../components/ManageAdminMovie";

const theme = createTheme();

function ComingSoon() {
  // eslint-disable-next-line
  const [openAddMovieDialog, setOpenAddMovieDialog] = useState(0);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
            position: "relative",
          }}
          maxWidth="md"
        >
          <div
            style={{
              margin: "auto",
              width: "30%",
              padding: "10px",
            }}
          >
            <h1>Coming Soon!</h1>
          </div>
          <ManageAdminMovie openAdd={openAddMovieDialog} />
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default ComingSoon;
