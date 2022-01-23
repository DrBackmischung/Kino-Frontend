import React from "react";
import "./Footer.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import palette from "../../config/Colours";

const theme = createTheme(palette)

const Footer = () =>{
    return(
        <ThemeProvider theme={theme}>
            <div className="footer-main">
                <div className="footer-container">
                    <div className="footer-row">
                        <a 
                            className="footer-link"
                            href="./Impressum">
                                Impressum/Kontakt
                        </a>
                    </div>
                    <div className="footer-row">
                        <p>
                            &copy;{new Date().getFullYear()} KINO | All rights reserved 
                        </p>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Footer;