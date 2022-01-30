import React from "react";
import CookieConsent from "react-cookie-consent";

function CookiesNotification(){

    return(
        <div>
            <CookieConsent
                location="bottom"
                buttonText="Accept"
                cookieName="gerneralCookies"
                style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#4e503b", fontSize: "15px" }}
            >
                Diese Website verwendet essentielle Cookies, um die Benutzererfahrung zu verbessern.{" "}
                <span style={{ fontSize: "12px" }}>Durch die Nutzung dieser Website stimmst Du den Nutzungsbedingungen
                    für essentielle Cookies zu!</span>
            </CookieConsent>
        </div>
    )
}

export default CookiesNotification;