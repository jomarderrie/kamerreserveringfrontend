import styled from 'styled-components';

import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";
import { setRem } from "../styles";

export const StyledRouterLink = (props) => {
  let { p, to, linkName, children, activeClassName } = props;

    return ( <
        div className = { p }
        style = {
            { width: "100%" }
        } >
        <
        NavLink2 to = { to }
        className = { p }
        activeClassName = { activeClassName } > { linkName } { children } <
        /NavLink2> < /
        div >
    );
}

export const NavLink2 = styled(NavLink)`
  padding: 4rem 1rem;
  color: black;
  text-decoration: none;
  &.hover:hover {
    color: lightblue;
  }
  &.active {
    padding: 5px 2px;
    border-bottom-color: rgba(140, 130, 115, 0.12);
    border-bottom: 2px solid;
  }
`;

export const StyledRouterLinkWrapper = styled(StyledRouterLink)
`
  text-decoration: none;
  font-weight: bolder;
  color: black;
  .home-link {
    background: green;
  }
`