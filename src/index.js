import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import KamerProvider from "./context/KamersContext";
import { GlobalsStyle } from "./styled/GlobalStyle";

ReactDOM.render(
  <Router>
    <KamerProvider>
      <AuthProvider>
        <GlobalsStyle></GlobalsStyle>
        <App />
      </AuthProvider>
    </KamerProvider>
  </Router>,
document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
