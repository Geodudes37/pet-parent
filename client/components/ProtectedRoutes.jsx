import React from "react";
import { Outlet } from "react-router";
import Login from "./Login.jsx";

const useAuth = () => {
    //find a way to pull the cookie value of a key name decided
    //If that value is an empty string, it means we're not logged in and we return false
    //if it has length it's true
    document.cookie = "username=Garima is a fantastic"
    console.log(decodeURIComponent(document.cookie))
    const user = { LoggedIn: false}
    return user && user.LoggedIn
}

const ProtectedRoutes = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet/> : <Login/>
}

export default ProtectedRoutes