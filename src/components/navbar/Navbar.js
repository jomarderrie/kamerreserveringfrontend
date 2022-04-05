import React, {Component, useContext} from 'react';
import {Image} from "../../styled/Image";
import Logo from "../../images/logo.svg";
import {Link} from "react-router-dom";
import styled from "styled-components"

import {StyledRouterLink} from '../../styled/globals/StyledRouterLink';
import {FlexBox, LinkFlexBoxContainer, StyledFlexBoxContainer} from '../../styled/styles';
import {AuthContext} from "../../context/AuthContext";

const Navbar = () => {
   
    const {
        user, logout
    } = useContext(AuthContext);

    return (
        <StyledFlexBoxContainer cssClass="link-box-container" x="space-between">


            <StyledRouterLink activeClassName={"none"} to={"/"}>

                <Image logo={Logo} width={52} height={48}/>
                Kamer reservering

            </StyledRouterLink>

            <LinkFlexBoxContainer>
                {user.role === "" &&
                    <>
                        <StyledRouterLink to={"/login"} p={"hover"}>
                            Login
                        </StyledRouterLink>
                        {/* <StyledRouterLink to={"/register"} active={"active"} p={"hover"}>
                            Register
                        </StyledRouterLink> */}
                    </>
                }

                {user.role !== "" &&
                    <StyledRouterLink to={"/kamers"} p={"hover"}>
                        Kamers
                    </StyledRouterLink>
                }


                {
                   user && user.role === "admin" && <StyledRouterLink to={"/gebruikers"} p={"hover"}>
                        Gebruikers
                    </StyledRouterLink>
                }
                {
                    user && user.role === "admin" && <StyledRouterLink to={"/admin/reservaties"} p={"hover"}>
                        Reservaties
                    </StyledRouterLink>
                }
                 {
                    user && user.role === "user" && <StyledRouterLink to={"/reservaties"} p={"hover"}>
                        Reservaties
                    </StyledRouterLink>
                }


                {
                    user && (user.role === "user") && <StyledRouterLink to={"/profiel"} p={"hover"}>
                        Profiel
                    </StyledRouterLink>
                }
<div>


                {
                    user.role !== "" && <p className='logout' onClick={() => logout()}>Logout </p>
                }

      </div>      </LinkFlexBoxContainer>
        </StyledFlexBoxContainer>

    );
}


// =>(

// )`
// .link-box-container{
//     border-bottom-color: rgba(140, 130, 115, 0.12);
//     border-bottom: 2px solid;
// }
// `


export default Navbar;