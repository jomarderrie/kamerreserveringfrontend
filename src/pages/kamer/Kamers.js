import React, {Component, useEffect, useState} from 'react';
import {getAllKamers} from "../../functions/kamers";
import {set} from "react-hook-form";
import {FlexBox} from "../../styled/styles";
import KamerCard from "../../components/kamer/KamerCard";
import { Link, useHistory } from 'react-router-dom'

function Kamers() {
    const [kamers, setKamers] = useState([]);
    const [loading,setLoading] = useState(false);
    let history = useHistory();

    useEffect(() => {
        setLoading(true);
        getAllKamers().then((res, err) =>{
            console.log(res);
            setKamers(res.data);
            setLoading(false);
        })
    }, []);

    const handleDateTimeChange = (e) =>{
        console.log(e)
    }

    return (
        <div>
            <h2>
                Kamers
            </h2>
            <Link
                className="btn btn-pink"
                role="button"
                to={`/kamer/new`}
                type="button"
            >
               Maak nieuwe kamer
            </Link>

           

            <FlexBox>
                {kamers.map((kamer) => {
                    return <div key={kamer.id}>
                        <KamerCard kamer={kamer} handleDateTimeChange={handleDateTimeChange}/>
                    </div>
                })}
            </FlexBox>
        </div>
    );
}


// class Kamers extends Component {
//
//
//     render() {
//         return (
//             <div>
//                 hello from kamers
//             </div>
//         );
//     }
// }

export default Kamers;