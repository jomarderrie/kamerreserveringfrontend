import React, {Component, useContext, useEffect} from 'react';
import {ReservatiesContext} from "../../context/ReservatiesContext";
import {AuthContext} from "../../context/AuthContext";
import AdminReserveringTable from "../../components/reservaties/AdminReserveringTable";
import {FlexBox} from "../../styled/styles";

export default function AdminReservaties(){
    const {user, token} = useContext(AuthContext);

    const {reservaties, pageReservatieInfo, setPageReservatieInfo,getPaginatedReservatiesAdmin, loading123 } = useContext(ReservatiesContext)

    // useEffect(() => {
    //
    //         getPaginatedReservatiesAdmin(0, 5, "", token)
    // }, [token]);


    return (
        <FlexBox>
            <h1>All gebruikers reservaties</h1>
            <AdminReserveringTable reservaties={reservaties} getPaginatedReservaties={getPaginatedReservatiesAdmin} pageCount={pageReservatieInfo.pageNo} email={user.email} token={token} loading123={loading123} />
        </FlexBox>
    )
};