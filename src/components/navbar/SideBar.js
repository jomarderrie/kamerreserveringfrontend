import React, { useContext, useState } from "react";
import InputWithImage from "../../styled/globals/Input";
import { FlexBoxUpDown } from "../../styled/globals/StyledFlexBoxContainer";
import { FlexBox } from "../../styled/styles";
import styled from "styled-components";
import { KamersContext } from "../../context/KamersContext";
const SideBar = () => {
  const [submitting, setSubmitting] = useState(false);
  const { pageKamerFilters, setPageKamerFilters } = useContext(KamersContext);

    const handleOnSearchChange = (e) =>{
        
    }

  return (
    <SideBarBox leftRight="15" z='column' x='start' y="start">
      <InputWithImage
        placeHolderName="Naam, locatie, sterren"
        icon="fa-search"
        onchange={(e) => handleOnSearchChange(e)}
      />
      <div className="single-extra">
        <input
          id=""
          type="checkbox"
          name="Eigen Reservaties"
          checked={pageKamerFilters.eigenReservaties}
        />
             <label htmlFor="Eigen Reservaties">Eigen Reservaties</label>
        <div>
          <input
            id="alGereserveerde"
            type="checkbox"
            name="Al gereserveerd"
            checked={pageKamerFilters.alGereserveerde}
          />
          <label htmlFor="Al gereserveerd">Al gereserveerd</label>
        </div>
      </div>
    </SideBarBox>
  );
};

export const SideBarBox = styled(FlexBoxUpDown)``;

export default SideBar;
