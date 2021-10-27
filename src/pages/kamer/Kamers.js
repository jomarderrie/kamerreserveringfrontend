import React, {Component, useEffect, useState} from 'react';
import {getAllKamers} from "../../functions/kamers";
import {set} from "react-hook-form";
import {FlexBox} from "../../styled/styles";
import KamerCard from "../../components/kamer/KamerCard";
import { Link, useHistory } from 'react-router-dom'
import { toast } from "react-toastify";
import { deleteKamer } from '../../functions/kamers';

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

    

    const deleteKamerOnClick = async (e) =>{
        console.log(e.target.value);
        await deleteKamer(e.target.value).then((res,err) =>{
            if(err){
                console.log(err);
                toast.error("Error met het toevoegen van een kamer")
            }else{
                setKamers(prevKamer =>{
                    return prevKamer.filter((kamer) =>{
                        return kamer.naam !== e.target.value
                    })
                })
                toast.success(`Delete kamer met naam ${e.target.value}`)
            }
        })
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
                        <KamerCard kamer={kamer} deleteKamer={deleteKamerOnClick}/>
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