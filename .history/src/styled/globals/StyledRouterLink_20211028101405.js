import styled from 'styled-components';

import React, {Component} from 'react';
import {Link, NavLink} from "react-router-dom";
import {setRem} from "../styles";

export const StyledRouterLink = ({p, to, linkName, children}) => {

    return (
        <div className={p}>
            <NavLink2 to={to} className={p}>
                {linkName}
                {children}
            </NavLink2>
        </div>
    );
}

export const NavLink2 = styled(NavLink)`
  padding: 4rem 1rem;
  
  color: black;
  text-decoration: none;

  &:hover {
    color: lightblue;
  }
  
`;

export const StyledRouterLinkWrapper = styled(StyledRouterLink)`
  text-decoration: none;
  font-weight: bolder;
  color: black;
  .home-link {
    background: green;
  }
`
export default StyledRouterLinkWrapper;