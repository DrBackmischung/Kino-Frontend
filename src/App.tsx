import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import MenuBar from "./app/components/layouts/MenuBar";
import Footer from "./app/components/layouts/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import palette from "./app/config/Colours";

const queryClient = new QueryClient();
const theme = createTheme(palette)

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="app-container">
                <QueryClientProvider client={queryClient}>
                    <div className="app-wrapper">
                        <MenuBar />
                    </div>
                    <Footer/>
                </QueryClientProvider>
            </div>
        </ThemeProvider>
    );
}

export default App;
