import React, { useContext, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getHuidigeGebruikerMetToken } from "../../functions/user";
import LoadingToRedirect from "./LoadingRedirect";

const AdminRoute = ({ children, ...rest }) => {
  const {
    token, user
} = useContext(AuthContext);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user.role === "admin") {
         setOk(true);
    }
  }, [user, ok, token]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;