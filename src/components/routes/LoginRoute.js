import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {Route, useHistory, useLocation} from "react-router-dom";
import LoadingToRedirect from "./LoadingRedirect";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import Home from "../../pages/Home";

const LoginRoute = ({children, ...rest}) => {
    const {
        token, user
    } = useContext(AuthContext);
    const location = useLocation();
    let history = useHistory();

    useEffect(() => {
        console.log("Location changed", location);
        console.log(history.location.pathname)
    }, [location]);


    const [ok, setOk] = useState(false);
useEffect(() =>{
    console.log(history)
}, [])

    useEffect(() => {
        let intended = history.location.state;
        if (user.role === "user" || user.role === "admin") {
            setOk(true)
            history.push("/kamers")
        }else{
            console.log(history, "INTEDED")
            history.push(history.location.pathname)
        }
    }, [user, ok, token, history]);

const LoginComponentBasedOnRoute = () => {
    switch (history.location.pathname) {
        case "/register":
            return <Register />
        case "/login":
            return <Login/>
        case "/":
            return <Home/>
        // default:

    }
}

    return ok ? <Route {...rest} /> :<LoginComponentBasedOnRoute/>;
};

export default LoginRoute;