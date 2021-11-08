import React from 'react'
import NieuweKamerForm from '../../components/kamer/NieuweKamerForm'
import { FlexBox } from '../../styled/styles'

export default function MaakNieuweKamer() {


    return (
        <FlexBox z={"column"}>
            <h2 style={{paddingTop:'40px'}}>Maak een nieuwe kamer aan!</h2>
            <NieuweKamerForm/>
        </FlexBox>
    )
}
