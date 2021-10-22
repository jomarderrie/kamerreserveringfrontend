import React, {Component} from 'react';
import {FlexBox} from "../../styled/styles";
import {Image} from "../../styled/Image";
import Logo from "../../images/logo.svg";
import {Link} from "react-router-dom";
import styled from "styled-components"
const Navbar = () => {
    return (

        <LinkFlexBoxContainer x={"space-between"}>
            <Link to={"/"}>
                <Image logo={Logo} width={64} height={52}/>
                Kamer reservering
            </Link>
            <LinkFlexBoxContainer>
                <Link to={"/register"} >
                    register
                </Link>
                <Link to={"/login"}>
                    login
                </Link>
                <Link to={"/kamers"}>
                    kamers
                </Link>
                <Link to={"/gebruikers"}>
                    gebruikers
                </Link>
            </LinkFlexBoxContainer>
        </LinkFlexBoxContainer>

    );
}

const LinkFlexBoxContainer = styled(FlexBox)`

  border-bottom-color: rgba(140, 130, 115, 0.12);
  border-bottom: 2px solid;
  a{
    padding:10px;
    text-decoration: none;
    color: black;
  }
`


export default Navbar;