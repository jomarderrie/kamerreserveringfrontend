import React, {useContext, useState} from "react";
import {getAllReservatiesPaginatedForUser} from "../functions/reservaties";
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



    const getPaginatedReservaties= async (huidgePagina, pageSize, sortBy, email, token) => {
        getAllReservatiesPaginatedForUser(email,huidgePagina, pageSize, sortBy, email, token).then((res,err) =>{
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
            }
        })
    }


    return (
        <ReservatiesContext.Provider value={{reservaties,
            setReservaties,
            pageReservatieInfo,
            setPageReservatieInfo,
            getPaginatedReservaties,}}>
            {children}
        </ReservatiesContext.Provider>
    )
}