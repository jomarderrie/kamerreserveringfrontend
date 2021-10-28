import React, {Component} from 'react';
import SignUpForm from "../../components/auth/SignUpForm";
import { AuthContext } from '../../context/AuthContext';
import {FlexBox} from "../../styled/styles";


export default function Register() {
    return (
        <FlexBox z={"column"}>
            <h2 style={{paddingTop:"100px"}}>Registratie</h2>
            <SignUpForm/>
        </FlexBox>
    );
}

