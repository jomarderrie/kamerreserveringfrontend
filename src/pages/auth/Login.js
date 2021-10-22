import React, { Component, useContext } from 'react';
import { FlexBox } from "../../styled/styles";
import LoginForm from "../../components/auth/LoginForm";


export default function Login() {



    return (
        <FlexBox z={"column"}>
            <h2>Login</h2>
            <LoginForm />
        </FlexBox>
    )
}

