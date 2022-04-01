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
    console.log(ok)
    if (user && user.token) {
      getHuidigeGebruikerMetToken(token)
        .then((res) => {
          if(res.role === "admin"){
            console.log("CURRENT ADMIN RES", res);
            setOk(true);
          }
        })
        .catch((err) => {
          console.log("ADMIN ROUTE ERR", err);
          setOk(false);
        });
    }
  }, [user, ok, token]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;