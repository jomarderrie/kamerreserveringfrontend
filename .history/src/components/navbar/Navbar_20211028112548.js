import React, {Component} from 'react';
import {FlexBox} from "../../styled/styles";
import {Image} from "../../styled/Image";
import Logo from "../../images/logo.svg";
import {Link} from "react-router-dom";
import styled from "styled-components"
import {StyledRouterLink} from '../../styled/globals/StyledRouterLink';
import { LinkFlexBoxContainer, StyledFlexBoxContainer } from '../../styled/globals/StyledFlexBoxContainer';
LinkFlexBoxContainer
const Navbar = () => {
    return (
        <StyledFlexBoxContainer className="link-box-container" x="space-between">
            <StyledRouterLink  to={"/"}>
            <Image logo={Logo} width={64} height={52}/>
                Kamer reservering
            </StyledRouterLink>
            <LinkFlexBoxContainer>
                <StyledRouterLink to={"/register"} >
                    register
                </StyledRouterLink>
                <StyledRouterLink to={"/login"}>
                    login
                </StyledRouterLink>
                <StyledRouterLink to={"/kamers"}>
                    kamers
                </StyledRouterLink>
                <StyledRouterLink to={"/gebruikers"}>
                    gebruikers
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