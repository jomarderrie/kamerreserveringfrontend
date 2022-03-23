import React, {useContext, useState, useEffect} from "react";
import InputWithImage from "../../styled/globals/Input";
import {FlexBoxUpDown} from "../../styled/globals/StyledFlexBoxContainer";
import {FlexBox} from "../../styled/styles";
import styled from "styled-components";
import {KamersContext} from "../../context/KamersContext";

const SideBar = () => {
    const [submitting, setSubmitting] = useState(false);
    const {pageKamerFilters, setPageKamerFilters, filterRooms} = useContext(KamersContext);

    const handleOnSearchChange = (e) => {
        const {name, value} = e.target; // destructured object that taps into the event.target.name and value
        setPageKamerFilters((prevKamerFilterValues) => {
            if (name === "eigenReservaties") {
                // filterRooms(value);
                return {
                    ...prevKamerFilterValues,
                    'eigenReservaties': !prevKamerFilterValues.eigenReservaties
                }
            } else if (name === "alGereserveerde") {
                // filterRooms(value);
                return {
                    ...prevKamerFilterValues,
                    'alGereserveerde': !prevKamerFilterValues.alGereserveerde
                }
            } else {
                filterRooms(value);
                return {
                    ...prevKamerFilterValues,
                    [name]: value,
                };
            }
        })

    }

    // useEffect(() => {
    //     return () => {
    //         console.log(pageKamerFilters, "filters")
    //     };
    // }, [pageKamerFilters]);

    const handleOnSubmitSearch = (e) => {

        e.preventDefault()
        console.log(e.target[0].value, 'form')
    }
    return (
        <SideBarBox leftRight="15" z='column' x='start' y="start">
            <form onSubmit={handleOnSubmitSearch}>
                <InputWithImage
                    placeHolderName="Naam, locatie, sterren"
                    icon="fa-search"
                    name={"searchKamerString"}
                    onchange={handleOnSearchChange}
                />
                <div className="single-extra">
                    <input
                        id="eigen-reservatie"
                        type="checkbox"
                        name="eigenReservaties"
                        checked={pageKamerFilters.eigenReservaties}
                        onChange={(e) => handleOnSearchChange(e)}
                    />
                    <label htmlFor="eigenReservaties">Eigen Reservaties</label>
                    <div>
                        <input
                            id="al-gereserveerde"
                            type="checkbox"
                            name="alGereserveerde"
                            checked={pageKamerFilters.alGereserveerde}
                            onChange={(e) => handleOnSearchChange(e)}
                        />
                        <label htmlFor="Al gereserveerd">Al gereserveerd</label>
                    </div>
                </div>
                <input type={"submit"}>

                </input>
            </form>
        </SideBarBox>
    );
};

export const SideBarBox = styled(FlexBoxUpDown)``;

export default SideBar;
