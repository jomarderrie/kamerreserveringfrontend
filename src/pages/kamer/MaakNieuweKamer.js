import React from 'react'
import FileUpload from '../../components/kamer/FileUpload'

import NieuweKamerForm from '../../components/kamer/NieuweKamerForm'
import { FlexBox } from '../../styled/styles'
import { useState } from 'react';

export default function MaakNieuweKamer() {
    const [naam, setNaam] = useState("")

    return (
        <FlexBox z={"column"}>        
            <h2 style={{paddingTop:'40px'}}>Maak een nieuwe kamer aan!</h2>
            <NieuweKamerForm setNaam={setNaam}/>
        </FlexBox>
    )
}
