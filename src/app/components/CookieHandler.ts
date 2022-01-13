/*
HOW TO USE: 
1) import { setCookie, getCookie, isCookieSet } from "(...)/CookieHandler"; 
2) Set Cookies. The cookies will be remembered by the local browser for X days => setCookie(cookieName: String, cookieValue: String, expireDays: number)
3) Use cookies. Check for it with getCookie(cookieName: String) returns boolean; getCookie(cookieName:String) returns value from cookie.
*/

export const setCookie = (cookieName: String, cookieValue: String, expireDays: number) => {
    const expireDate: Date = new Date();
    expireDate.setTime(expireDate.getTime() + (expireDays*24*60*60*1000));
    document.cookie = `${cookieName}=${cookieValue};expires=${expireDate};path=/`;
}

export const getCookie = (cookieName: String): String => {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let allCookies = decodedCookie.split(';');
    for(let i = 0; i <allCookies.length; i++) {
      let cookie = allCookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "NotFound!";
}

export const isCookieSet = (cookieName: String): boolean => {
    let cookie = getCookie(cookieName);
    if(cookie !== "NotFound!" ) {
        return true;
    } else {
        return false;
    }

}