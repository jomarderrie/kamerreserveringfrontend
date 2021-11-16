import React from 'react'
import FileUpload from '../../components/kamer/FileUpload'
import UploadFile from '../../components/kamer/FileUpload'
import NieuweKamerForm from '../../components/kamer/NieuweKamerForm'
import SimpleReactFileUpload from '../../components/kamer/Simple'
import { FlexBox } from '../../styled/styles'

export default function MaakNieuweKamer() {


    return (
        <FlexBox z={"column"}>
            <SimpleReactFileUpload></SimpleReactFileUpload>
        
            <h2 style={{paddingTop:'40px'}}>Maak een nieuwe kamer aan!</h2>
            <NieuweKamerForm/>
        </FlexBox>
    )
}
