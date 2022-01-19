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
                onAccept={(acceptedByScrolling) => {
                    if (acceptedByScrolling) {
                        alert("Cookies were accepted by the scrolling of the user!");
                    } else {
                        alert("Cookies were accepted by the clicking the accept button!");
                    }
                }}
            >
                This website uses functional cookies to enhance the user experience.{" "}
                <span style={{ fontSize: "12px" }}>By using this website you agree to the terms of the usage of
                functional cookies!</span>
            </CookieConsent>
        </div>
    )
}

export default CookiesNotification;