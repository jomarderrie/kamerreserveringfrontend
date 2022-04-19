import React, {useState, useEffect, useContext} from 'react'

import {AuthContext} from "../../context/AuthContext";
import {toast} from "react-toastify";
import {ReservatiesContext} from "../../context/ReservatiesContext";
import {useSortBy} from "react-table";
import KamerReserveringTable from "../../components/kamer/KamerReserveringTable";
import ReserveringTable from "../../components/reservaties/ReserveringTable";
import {FlexBoxUpDown} from "../../styled/globals/StyledFlexBoxContainer";
import {getAllReservatiesPaginatedForUser} from "../../functions/reservaties";

export default function Reservaties() {
    const [state, setState] = useState('idle')
    const {user, token} = useContext(AuthContext);
    const [loading,setLoading] = useState(true)
    const {reservaties, pageReservatieInfo, setPageReservatieInfo,getPaginatedReservaties, loading123, deleteReservatieContext, setReservaties  } = useContext(ReservatiesContext)



    return (
        <FlexBoxUpDown z={"column"} upDown={20}>
            <h1>Je eigen reservaties</h1>
            <ReserveringTable reservaties={reservaties} setReservaties={setReservaties} getPaginatedReservaties={getPaginatedReservaties} pageCount={pageReservatieInfo.pageNo} email={user.email} token={token} loading123={loading123} deleteReservatie={deleteReservatieContext}/>
        </FlexBoxUpDown>
    )
}
