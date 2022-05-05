import React, {useState, useEffect, useContext} from 'react'

import {AuthContext} from "../../context/AuthContext";
import {ReservatiesContext} from "../../context/ReservatiesContext";
import ReserveringTable from "../../components/reservaties/ReserveringTable";
import {FlexBoxUpDown} from "../../styled/globals/StyledFlexBoxContainer";

export default function Reservaties() {
    const {user, token} = useContext(AuthContext);
    const {reservaties, pageReservatieInfo, setPageReservatieInfo,getPaginatedReservaties, loading123, deleteReservatieContext, setReservaties  } = useContext(ReservatiesContext)

    return (
        <FlexBoxUpDown z={"column"} upDown={20}>
            <h1>Jouw reservaties</h1>
            <ReserveringTable reservaties={reservaties}
                              user={user} setReservaties={setReservaties}
                              getPaginatedReservaties={getPaginatedReservaties}
                              singleRoom={false}                                   pageCount={pageReservatieInfo.pageNo} email={user.email} token={token} loading123={loading123}
                              deleteReservatie={deleteReservatieContext}/>
        </FlexBoxUpDown>
    )
}
