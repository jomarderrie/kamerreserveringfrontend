import React, {Component} from 'react';
import SignUpForm from "../../components/auth/SignUpForm";
import { AuthContext } from '../../context/AuthContext';
import { StyledRouterLink } from '../../styled/globals/StyledRouterLink';
import {FlexBox} from "../../styled/styles";


export default function Register() {
    return (
        <FlexBox z={"column"}>
            <h2 style={{paddingTop:"100px"}}>Registratie</h2>
            <SignUpForm/>
            <p style={{paddingTop:"10px", fontSize:'20px'}}>
          <StyledRouterLink
            activeClassName={"none"}
            to={"/login"}
          > Al een account? Login dan in!{" "}Klik hier om in te loggen</StyledRouterLink>
        </p>
        </FlexBox>
    );
}

