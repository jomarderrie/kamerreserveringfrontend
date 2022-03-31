import { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ children, ...rest }) => {
    const {
        token, user
    } = useContext(AuthContext);

  return token !== "" && user? <Route {...rest} /> : <LoadingToRedirect />;
};

export default UserRoute;
