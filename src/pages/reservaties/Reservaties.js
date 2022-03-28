import React, {useState, useEffect} from 'react'
import { getAllReservatiesForUser } from '../../functions/reservaties';

export default function Reservaties() {
    const [reservaties, setReservaties] = useState([]);
    const [state,setState] = useState('idle')
    useEffect(() => {
        console.log("kek");
        getAllReservatiesForUser("admin@gmail.com").then((res) =>{
            console.log(res, "test");
        })
      
    }, []);

  
    
    
    return (
        <div>
            
            Reservaties
        </div>
    )
}