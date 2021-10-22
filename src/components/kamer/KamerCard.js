import React, { Component, useContext } from 'react';
import { FlexBox } from "../../styled/styles";
import DatePicker from "react-datepicker";
import { AuthContext } from '../../context/AuthContext';
import { Link } from "react-router-dom";

const KamerCard = ({ kamer }) => {
    const { user } = useContext(AuthContext)


    return (
        <FlexBox z={"column"}>
            <Link to={`/kamer/${kamer.naam}`}>
                {kamer.naam}
            </Link>

            <Link
                className="btn btn-pink"
                role="button"
                to={`/kamer/${kamer.naam}/edit`}
            >
                Edit
            </Link>

            <button>delete</button>
        </FlexBox>
    )
}

export default KamerCard;