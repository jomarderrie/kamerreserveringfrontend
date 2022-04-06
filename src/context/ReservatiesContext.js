import {useState} from "react";

export const ReservatiesContext = React.createContext();

export default function ReservatiesProvider({children}){
    const [reservaties, setReservaties] = useState([])

    return (
        <ReservatiesContextwater.Provider value={{reservaties,setReservaties}}>
            {children}
        </ReservatiesContextwater.Provider>
    )
}