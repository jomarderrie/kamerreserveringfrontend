import React, {useState, useEffect, useContext} from 'react'

import {AuthContext} from "../../context/AuthContext";
import {toast} from "react-toastify";
import {ReservatiesContext} from "../../context/ReservatiesContext";
import {useSortBy} from "react-table";
import KamerReserveringTable from "../../components/kamer/KamerReserveringTable";
import ReserveringTable from "../../components/reservaties/ReserveringTable";

export default function Reservaties(props) {
    const [state, setState] = useState('idle')
    const {user, token} = useContext(AuthContext);
    const [loading,setLoading] = useState(true)
    const {reservaties, pageReservatieInfo, setPageReservatieInfo,getPaginatedReservaties, } = useContext(ReservatiesContext)

    useEffect(() => {
        if(props.location.search){
            const urlSearchParams = new URLSearchParams(props.location.search);
            getPaginatedReservaties(urlSearchParams.get("pageNo"), urlSearchParams.get("pageSize"), "", user.email, token).catch(err => toast.error(err.message))
        }else{
            getPaginatedReservaties(
                pageReservatieInfo.pageNo,
                pageReservatieInfo.pageSize,
                "",
                token
            ).then(() => {
                setLoading(false);
            }).catch(err => toast.error(err.message));
        }
    }, [user, token]);


    return (
        <div>
            <ReserveringTable reservaties={reservaties} getPaginatedReservaties={getPaginatedReservaties} pageCount={1}/>
            Reservaties
        </div>
    )
}
