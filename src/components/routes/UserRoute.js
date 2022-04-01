import { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoadingToRedirect from "./LoadingRedirect";

const UserRoute = ({ children, ...rest }) => {
    const {
        token, user
    } = useContext(AuthContext);

  return token !== "" && user.role !== ""? <Route {...rest} /> : <LoadingToRedirect />;
};

export default UserRoute;
