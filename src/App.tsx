import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import MenuBar from "./app/components/layouts/MenuBar";
import Footer from "./app/components/layouts/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import palette from "./app/config/Colours";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();
const theme = createTheme(palette)

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MenuBar />
        <Footer/>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
