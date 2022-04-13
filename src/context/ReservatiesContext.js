import React, {useContext, useState} from "react";
import {getAllReservaties, getAllReservatiesPaginatedForUser} from "../functions/reservaties";
export const ReservatiesContext = React.createContext();

export default function ReservatiesProvider({children}){
    const [reservaties, setReservaties] = useState([])
    const [pageReservatieInfo, setPageReservatieInfo] = useState({
        pageNo: 0,
        pageSize: 5,
        sortBy: "naam",
        content: [],
        totalPages: 0,
        totalElements: 0,
    })
    const [loading123, setLoading123] = useState(true)



    const getPaginatedReservaties= async (email,huidgePagina, pageSize, sortBy, token) => {
        console.log(token, "args")
        setLoading123(true)
        getAllReservatiesPaginatedForUser(email,huidgePagina, pageSize, sortBy, token).then((res,err) =>{
            if(err){

            }else{
                setReservaties(res.data.content)
                setPageReservatieInfo({
                    totalPages: res.data.totalPages,
                    totalElements: res.data.totalElements,
                    pageNo: res.data.number,
                    pageSize: res.data.size,
                    content: res.data.content
                })
                setLoading123(false)
            }
        })
    }

    const getPaginatedReservatiesAdmin = async (huidgePagina, pageSize, sortBy, token) =>{
        getAllReservaties(huidgePagina, pageSize, sortBy, token ).then((res,err) =>{
            if (err){

            }else{
                setReservaties(res.data.content)
                setPageReservatieInfo({
                    totalPages: res.data.totalPages,
                    totalElements: res.data.totalElements,
                    pageNo: res.data.number,
                    pageSize: res.data.size,
                    content: res.data.content
                })
                setLoading123(false)
            }
        })
    }


    return (
        <ReservatiesContext.Provider value={{reservaties,
            setReservaties,
            pageReservatieInfo,
            setPageReservatieInfo,
            getPaginatedReservaties, loading123,
        getPaginatedReservatiesAdmin}}>
            {children}
        </ReservatiesContext.Provider>
    )
}