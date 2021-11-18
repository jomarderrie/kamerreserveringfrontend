import React from 'react'
import { useState } from 'react';
import axios, { post } from 'axios';

import { uploadKamerImages, uploadKamerImagesPost } from './../../functions/images';
import { toast } from "react-toastify";
import { isFiletypeImage } from './../../helpers/detectFileTypeIsImage';
import { GridImages } from '../../styled/globals/StyledFlexBoxContainer';

const FileUpload = ({naam}) => {
    const [files, setFiles] = useState(null);
    const [loading, setLoading] = useState(false);
    const [resizedImages, setImages] = useState(null)
    const [submitting, setSubmitting] = useState(false);

    const onFormSubmit = (e) =>{
        console.log(naam, "nek");
        e.preventDefault();
        // sendFilesToBackend(files);
        if(files!==[]){
            checkFiles(files)
            const url = 'http://localhost:8080/images/kamer/kamer1/upload/images';
            const formData = new FormData();
            Array.from(files).forEach((image,index) => {
                console.log(image, "image " + index);
                formData.append("files", image, image.name);
            });
        
          
            const config = {
                headers: {
                    authorization:
                    "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
                  "Access-Control-Allow-Origin": "*",
                    'content-type': 'multipart/form-data'
                }
            }
            return  post(url, formData,config);
        }else{
            toast.error("Minstens 1 foto")
        }
    }
    const checkFiles = (files) => {
        let itemsInArray = Array.from(files)
        let images = [];
        for (let index = 0; index < itemsInArray.length; index++) {
            console.log(files[index]);
            let urlImage = URL.createObjectURL(itemsInArray[index])
            images.push(urlImage);
            if(!isFiletypeImage(itemsInArray[index].type)){
                toast.error("File types alleen jpeg, jpg of png")
                break;
            }
        }
        setImages(images)
        console.log(images);
    
    }

    const onChange = (e) => {
        // console.log(parseInt(e.target.files.length)>8, "length");
        console.log(parseInt(e.target.files.length)<8, "test123");
        console.log(e.target.files.length);
        if(parseInt(e.target.files.length)<8){
            setFiles(e.target.files)
            checkFiles(e.target.files)
        }else{
            toast.error("maximum 8 images")
        }
      }

    
    const onDeleteImage =(e) =>{
        
    }  
    // onSubmit={(e) => onFormSubmit(e)}
    return (
        <div >
            {resizedImages!==null && (
          <GridImages display={"grid"}>
            {resizedImages.map((img, i) => {
              return <img className="preview" src={img} alt={"image-" + i}  key={i}/>;
            })}
          </GridImages>
        )}
            <input type="file" multiple onChange={onChange} />
            <button type="submit">Upload</button>
        </div>
    )
}

export default FileUpload
