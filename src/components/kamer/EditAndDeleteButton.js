import React, {Component, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { useTable } from 'react-table'
import {handleClickEditRow} from "./HandleClickEditRow";
import {deleteReservatie} from "../../functions/reservaties";

const EditAndDeleteButton = ({originalRow, rowIndex, startDate, endDate, token, email, setReservaties, setStartDate, setEndDate, user, singleRoom} = this.props) => {
    const [kamerStartReserveringen, setKamerReserveringenStart] = useState([])
    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() =>{
        console.log(originalRow, "org")
        console.log(user, "user123")
        if (originalRow){
            setLoading(false)
        }else{
            setLoading(true)
        }
        // console.log((originalRow.naam === user.naam))
    }, [])
    return singleRoom ? <div>
        <button
            disabled={!(originalRow.naam === user.naam && originalRow.achterNaam === user.achternaam ) }
            onClick={() => handleClickEditRow(originalRow, rowIndex, startDate, endDate, token, setReservaties, setStartDate, setEndDate, user)}>
            {originalRow.isEditing ? "Save" : "Edit"}
        </button>
        <button
            disabled={!(originalRow.naam === user.naam && originalRow.achterNaam === user.achternaam ) }
            onClick={() => deleteReservatie(originalRow.naam, originalRow.id, token, email)}>
            Delete
        </button>
    </div> : <div>
        <button

            onClick={() => handleClickEditRow(originalRow, rowIndex, startDate, endDate, token, setReservaties, setStartDate, setEndDate, user)}>
            {originalRow.isEditing ? "Save" : "Edit"}
        </button>
        <button

            onClick={() => deleteReservatie(originalRow.naam, originalRow.id, token, email)}>
            Delete
        </button>
    </div>
}

export default EditAndDeleteButton;