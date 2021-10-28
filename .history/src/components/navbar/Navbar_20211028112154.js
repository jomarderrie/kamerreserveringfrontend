import React, {Component} from 'react';
import {FlexBox} from "../../styled/styles";
import {Image} from "../../styled/Image";
import Logo from "../../images/logo.svg";
import {Link} from "react-router-dom";
import styled from "styled-components"
import {StyledRouterLink} from '../../styled/globals/StyledRouterLink';
import { StyledFlexBoxContainer } from '../../styled/globals/StyledFlexBoxContainer';
const Navbar = () => {
    return (
        <StyledFlexBoxContainer className="link-box-container" x="space-between">
            <StyledRouterLink  to={"/"} >
            <Image logo={Logo} width={52} height={42}/>
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



export default Navbar;