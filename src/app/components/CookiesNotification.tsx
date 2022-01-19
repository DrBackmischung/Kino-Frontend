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
                This website uses essential cookies to enhance the user experience.{" "}
                <span style={{ fontSize: "12px" }}>By using this website you agree to the terms of the usage of
                essential cookies!</span>
            </CookieConsent>
        </div>
    )
}

export default CookiesNotification;