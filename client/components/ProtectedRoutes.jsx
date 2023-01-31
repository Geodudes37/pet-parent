import React from "react";
import { Outlet } from "react-router";
import Login from "./Login.jsx";

const useAuth = () => {
    const user = { LoggedIn: false}
    return user && user.LoggedIn
}

const ProtectedRoutes = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet/> : <Login/>
}

export default ProtectedRoutes