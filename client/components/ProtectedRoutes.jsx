import React from "react";
import { Outlet } from "react-router";
import Login from "./Login.jsx";

const getCookie = (cname) => {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (const c of ca) {
      let cookie = c;
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.startsWith(name)) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return '';
  };
  
  
const useAuth = () => {
    const session = getCookie('user')
    if(session.length) return true
    return false
}


const ProtectedRoutes = () => {
    const isAuth = useAuth()
    console.log(isAuth)
    return isAuth ? <Outlet/> : <Login/>
}

export default ProtectedRoutes