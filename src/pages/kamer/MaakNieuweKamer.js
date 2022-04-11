import React, {useContext, useEffect} from 'react'
import FileUpload from '../../components/kamer/FileUpload'

import NieuweKamerForm from '../../components/kamer/NieuweKamerForm'
import { FlexBox } from '../../styled/styles'
import { useState } from 'react';
import {AuthContext} from "../../context/AuthContext";

export default function MaakNieuweKamer(props) {
    const [kamerNaam, setKamerNaam] = useState("")
    const {user, token} = useContext(AuthContext);
    const { naam } = props.match.params;
    const [loading, setLoading] = useState(false);
    const [kamer, setKamer] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true)
        console.log(props.match.params, "params")
        if (props.match.params!==undefined){

        }else{

        }
    }, [])

    return (
        <FlexBox z={"column"}>        
            <h2 style={{paddingTop:'40px'}}>Maak een nieuwe kamer aan!</h2>
            <NieuweKamerForm setNaam={setKamerNaam}/>
        </FlexBox>
    )
}
