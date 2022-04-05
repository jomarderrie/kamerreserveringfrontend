import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {Route, useHistory} from "react-router-dom";
import LoadingToRedirect from "./LoadingRedirect";
import Login from "../../pages/auth/Login";

const LoginRoute = ({children, ...rest}) => {
    const {
        token, user
    } = useContext(AuthContext);
    let history = useHistory();
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (user.role === "user" || user.role === "admin") {
            setOk(true)
            history.push("/kamers")
        }else{
            history.push("/login")
        }
    }, [user, ok, token]);

    return ok ? <Route {...rest} /> :<Login/>;
};

export default LoginRoute;