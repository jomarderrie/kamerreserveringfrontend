import React, {useContext, useState, useEffect} from "react";
import InputWithImage from "../../styled/globals/Input";
import {FlexBoxUpDown} from "../../styled/globals/StyledFlexBoxContainer";
import {FlexBox} from "../../styled/styles";
import styled from "styled-components";
import {KamersContext} from "../../context/KamersContext";
import DatePicker, {ReactDatePicker} from "react-datepicker";
import {getAllkamersByNaamEnSortables} from "../../functions/kamers";
import {toast} from "react-toastify";
import {AuthContext} from "../../context/AuthContext";

const SideBar = () => {
    const [submitting, setSubmitting] = useState(false);
    const {pageKamerFilters, setPageKamerFilters, filterRooms, getPaginatedKamersSortables} = useContext(KamersContext);
    const {
        token, user
    } = useContext(AuthContext);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

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
        console.log(pageKamerFilters.searchKamerString)
        let a = new URLSearchParams(pageKamerFilters)
        console.log(pageKamerFilters)

        getPaginatedKamersSortables(pageKamerFilters,  token)


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
                        <label htmlFor="Al gereserveerd">Al gereserveerd(todo)</label>
                    </div>
                </div>
                <input type={"submit"} value={"zoek"}/>
            </form>
        </SideBarBox>
    );
};

export const SideBarBox = styled(FlexBoxUpDown)``;

export default SideBar;
