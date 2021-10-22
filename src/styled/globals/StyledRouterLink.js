import styled from 'styled-components';

import React, {Component} from 'react';
import {Link, NavLink} from "react-router-dom";
import {setRem} from "../styles";

const StyledRouterLink = ({to, linkName, p}) => {
    return (
        <div className={p}>
            <NavLink2 to={to} className={p}>
                {linkName}
            </NavLink2>
        </div>
    );
}

const NavLink2 = styled(NavLink)`
  padding: 4rem 1rem;
  
  color: black;
  text-decoration: none;

  &:hover {
    color: lightblue;
  }
  
`;

const StyledRouterLinkWrapper = styled(StyledRouterLink)`
  text-decoration: none;
  font-weight: bolder;
  color: black;
  .home-link {
    background: green;
  }
`
export default StyledRouterLinkWrapper;