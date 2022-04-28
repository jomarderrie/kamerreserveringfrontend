import {maakNieuweReservatie} from "../../functions/kamers";
import {toast} from "react-toastify";
import {endOfToday, set} from "date-fns";

export const handleClickEditRow = (originalRow, rowIndex, startDate, endDate, token, setReservaties, setStartDate, setEndDate) => {
    if (originalRow.isEditing) {
        setReservaties(prev => prev.map((r, index) => ({...r, isEditing: !rowIndex === index})))
        // check if start is before end
        // new Date(originalRow.startDate).isBefore(originalRow)
        // send async request
        // if good setstart and enddate
        maakNieuweReservatie(originalRow.naam, set(new Date(startDate), {hours: new Date(startDate).getHours() +2}), set(new Date(endDate), {hours: new Date(endDate).getHours() +2})
            , token).then ( (res,err)=>{
            if (err){
                toast.error(err.response)
            }else{
                toast.success("succesvol reservatie veranderd")
            }
        } ).catch(err =>{
            toast.error(err.response.data.message)
        })
        // else keep date and send error
    } else {
        setReservaties(prev => prev.map((r, index) => ({...r, isEditing: rowIndex === index})))
        setStartDate(new Date(originalRow.start))
        setEndDate(new Date(originalRow.end))
    }
}