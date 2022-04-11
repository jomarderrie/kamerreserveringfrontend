import React, {useState, useEffect, useContext} from 'react'

import {AuthContext} from "../../context/AuthContext";
import {toast} from "react-toastify";
import {ReservatiesContext} from "../../context/ReservatiesContext";
import {useSortBy} from "react-table";

export default function Reservaties(props) {
    const [state, setState] = useState('idle')
    const {user, token} = useContext(AuthContext);
    const [loading,setLoading] = useState(true)
    const {reservaties, pageReservatieInfo, setPageReservatieInfo,getPaginatedReservaties, } = useContext(ReservatiesContext)

    useEffect(() => {
        console.log("kek");
        if(props.location.search){
            const urlSearchParams = new URLSearchParams(props.location.search);
        }else{
            getPaginatedReservaties(
                pageReservatieInfo.pageNo,
                pageReservatieInfo.pageSize,
                pageReservatieInfo.sortBy,
                token
            ).then(() => {
                setLoading(false);
            });
        }
        getPaginatedReservaties(pageReservatieInfo.pageNo, pageReservatieInfo.pageSize, pageReservatieInfo.sortBy, user.email, token).then((res, err) => {
            if (err) {
                toast.error(err.message)
            } else {
                console.log(res, "hey")
            }
        })

    }, [user, token]);


    return (
        <div>

            Reservaties
        </div>
    )
}
