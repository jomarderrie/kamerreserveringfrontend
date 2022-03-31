import React, { useContext, useState } from "react";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
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
    console.log("logout");
}

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken,logout }}>
      {children}
    </AuthContext.Provider>
  );
}
