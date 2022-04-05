import {useContext, useEffect, useState} from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoadingToRedirect from "./LoadingRedirect";

const UserRoleRoute = ({ children, ...rest }) => {
    const {
        token, user
    } = useContext(AuthContext);
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (user.role === "user") {
            setOk(true);
        }
    }, [user, ok, token]);

  return ok? <Route {...rest} /> : <LoadingToRedirect />;
};

export default UserRoleRoute;
