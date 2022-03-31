import React, { Component, useContext } from "react";
import { FlexBox } from "../../styled/styles";
import LoginForm from "../../components/auth/LoginForm";
import SignUpForm from "../../components/auth/SignUpForm";
import { StyledRouterLink } from "../../styled/globals/StyledRouterLink";

export default function Login() {
  return (
    <FlexBox z={"column"}>
      <h2 style={{ paddingTop: "100px" }}>Login</h2>
      <LoginForm />
      <div>
        <p>
          <StyledRouterLink
            activeClassName={"none"}
            to={"/register"}

          > Geen account? Maak een account aan!{" "}klik hier</StyledRouterLink>
        </p>
      </div>
    </FlexBox>
  );
}
