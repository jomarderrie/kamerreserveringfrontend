import React, { Component } from 'react';
import { Image } from "../../styled/Image";
import Logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import styled from "styled-components"

import { StyledRouterLink } from '../../styled/globals/StyledRouterLink';
import { FlexBox, LinkFlexBoxContainer, StyledFlexBoxContainer } from '../../styled/styles';
const Navbar = () => {
    
    return (
        <StyledFlexBoxContainer cssClass="link-box-container" x="space-between">


            <StyledRouterLink activeClassName={"none"} to={"/"}>
              
                    <Image logo={Logo} width={52} height={48} />
                    Kamer reservering
                
            </StyledRouterLink>

            <LinkFlexBoxContainer>
                <StyledRouterLink to={"/register"} active={"active"}  p={"hover"}>
                    Register
                </StyledRouterLink>
                <StyledRouterLink to={"/login"}  p={"hover"}>
                    Login
                </StyledRouterLink>
                <StyledRouterLink to={"/kamers"}  p={"hover"}>
                    Kamers
                </StyledRouterLink>
                <StyledRouterLink to={"/gebruikers"}  p={"hover"}>
                    Gebruikers
                </StyledRouterLink>   <StyledRouterLink to={"/profiel"}  p={"hover"}>
                    Profiel
                </StyledRouterLink>
            </LinkFlexBoxContainer>
        </StyledFlexBoxContainer>

    );
}


//  =>(

// )`
// .link-box-container{
//     border-bottom-color: rgba(140, 130, 115, 0.12);
//     border-bottom: 2px solid;
// }
// `


export default Navbar;