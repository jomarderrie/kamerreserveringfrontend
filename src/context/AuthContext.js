import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import setAuthToken from "../helpers/setAuthToken";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    let history = useHistory();
  const [user, setUser] = useState({
    achternaam: "",
    email: "",
    laatstIngelodgeDatumDisplay: "",
    naam: "",
    profileFileAttachment: "",
    role: ""
    
  });

  const [token, setToken] = useState("");

  const logout = () => {
      setToken("")
      setUser( {achternaam: "",
      email: "",
      laatstIngelodgeDatumDisplay: "",
      naam: "",
      profileFileAttachment: "",
      role: ""})
      setAuthToken()
      history.push("/login")
}

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken,logout }}>
      {children}
    </AuthContext.Provider>
  );
}
