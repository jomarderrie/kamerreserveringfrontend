import { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoadingToRedirect from "./LoadingRedirect";

const UserRoleRoute = ({ children, ...rest }) => {
    const {
        token, user
    } = useContext(AuthContext);

  return token !== "" && user.role === "user"? <Route {...rest} /> : <LoadingToRedirect />;
};

export default UserRoleRoute;
