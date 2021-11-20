import styled from "styled-components";

import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { FlexBox, setRem } from "../styles";
import { FlexBoxUpDown } from "./StyledFlexBoxContainer";
export const StyledRouterLink = (props) => {
  let { p, to, linkName, children, activeClassName } = props;

  return (
    <div className={p} style={{ width: "100%" }}>
      <NavLink2 to={to} className={p} activeClassName={activeClassName}>
        {" "}
        {linkName} {children}{" "}
      </NavLink2>{" "}
    </div>
  );
};

export const NavLink2 = styled(NavLink)`
  padding: 0rem 1rem;
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

export const StyledRouterLinkWrapper = styled(StyledRouterLink)`
  text-decoration: none;
  font-weight: bolder;
  color: black;
  .home-link {
    background: green;
  }
`;

export const ButtonLink = (props) => {
  let url = props.to2 === undefined? null: props.to2;
console.log(props.to2, "hey")
  return (
    <Link to={`${url}`} disabled className="button">
      <ButtonWithIcon
        className={props.className}
        icon={props.icon}
        text={props.text}
        action={props.action}
        value2={props.value2}
      />
    </Link>
  );
};

export const ButtonWithIcon = (props) => {
  return (
    <button className={`${props.className}`} type="button" value={props.value2} 
    onClick={() =>props.action&&props?.action(props.naam)}>
      <FlexBoxUpDown x="space-between" leftRight="15">
        <span className={`fa ${props.icon} fa-2x button-icon`}></span>

        {props.text}
      </FlexBoxUpDown>
    </button>
  );
};

export const StyledButtonLink = styled(ButtonLink)`
  a {
    text-decoration: none;
    color: black;
  }
  
  padding: 8px 0px;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  .button-icon {
    padding-right: 10px;
  }
`;

export const StyledButtonDelete = styled(ButtonWithIcon)`
a {
    text-decoration: none;
    color: black;
  }
  
  padding: 8px 0px;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  .button-icon {
    padding-right: 10px;
  }
`