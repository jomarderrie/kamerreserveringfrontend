import React, {useState, useEffect, useContext} from 'react'
import {getAllReservatiesForUser} from '../../functions/reservaties';
import {AuthContext} from "../../context/AuthContext";
import {toast} from "react-toastify";
import {set} from "react-hook-form";

export default function Reservaties() {
    const [reservaties, setReservaties] = useState([]);
    const [state, setState] = useState('idle')
    const {user, token} = useContext(AuthContext);

    useEffect(() => {
        console.log("kek");
        getAllReservatiesForUser(user.email, token).then((res, err) => {
            if (err) {
                toast.error(err.message)
            } else {
                console.log(res.data, "hey")
                setReservaties(res.data)
            }
        })

    }, [user, token]);


    return (
        <div>

            Reservaties
        </div>
    )
}
