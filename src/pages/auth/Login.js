import React, { Component, useContext } from "react";
import { FlexBox } from "../../styled/styles";
import LoginForm from "../../components/auth/LoginForm";
import { StyledRouterLink } from "../../styled/globals/StyledRouterLink";

export default function Login() {
  return (
    <FlexBox z={"column"}>
      <h2 style={{ paddingTop: "100px" }}>Login</h2>
      <LoginForm />
      <div>
        <p style={{paddingTop:"10px", fontSize:'20px'}}>
          <StyledRouterLink
            activeClassName={"none"}
            to={"/register"}
          > Geen account? Maak een account aan!{" "}Klik hier</StyledRouterLink>
        </p>
      </div>
    </FlexBox>
  );
}
