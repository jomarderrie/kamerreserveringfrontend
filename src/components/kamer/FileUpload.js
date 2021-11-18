import React from "react";
import { useState } from "react";
import axios, { post } from "axios";
import deleteIcon from "../../images/trashIcon.svg";
import {
  uploadKamerImages,
  uploadKamerImagesPost,
} from "./../../functions/images";
import { toast } from "react-toastify";
import { isFiletypeImage } from "./../../helpers/detectFileTypeIsImage";
import { GridImages } from "../../styled/globals/StyledFlexBoxContainer";
import { FileUploadButton } from "../../styled/globals/Button";

const FileUpload = ({ naam }) => {
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resizedImages, setImages] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onFormSubmit = (e) => {
    console.log(naam, "nek");
    e.preventDefault();
    // sendFilesToBackend(files);
    if (files !== []) {
      checkFiles(files);
      const url = "http://localhost:8080/images/kamer/kamer1/upload/images";
      const formData = new FormData();
    
      (files).forEach((image, index) => {
        console.log(image, "image " + index);
        formData.append("files", image, image.name);
      });

      const config = {
        headers: {
          authorization:
            "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
          "Access-Control-Allow-Origin": "*",
          "content-type": "multipart/form-data",
        },
      };
      return post(url, formData, config);
    } else {
      toast.error("Minstens 1 foto");
    }
  };
  const checkFiles = (files) => {
   
    for (let index = 0; index < files.length; index++) {
      if (!isFiletypeImage(files[index].type)) {
        toast.error("File types alleen jpeg, jpg of png");
        return false;
      }
    }
    return true;
  };

  const setPreviewImages = (files) => {
    let images = [];
    files.forEach((item) => {
      let urlImage = URL.createObjectURL(item);
      images.push(urlImage);
    });
    setImages(images);
  };

  const onChange = (e) => {
    // console.log(parseInt(e.target.files.length)>8, "length");

    console.log(e.target.files, "onchange");
    let arrayFormFiles =Array.from(e.target.files); 
    console.log(arrayFormFiles, "ar");
    if (parseInt(e.target.files.length) < 8) {
      if (checkFiles(arrayFormFiles)) {
          setFiles(arrayFormFiles);
          setPreviewImages(arrayFormFiles);
      }
    } else {
      toast.error("maximum 8 images");
    }
  };

  const onDeleteImage = (e, index,files) => {
    e.preventDefault();
    let copyFileArray = files.slice();
    copyFileArray.splice(index,1)
    setFiles(copyFileArray)
    setPreviewImages(copyFileArray)
    console.log(copyFileArray,"afterdelete");
  };
  // onSubmit={(e) => onFormSubmit(e)}
  return (
    <div>
      {resizedImages !== null && (
        <GridImages display={"grid"} upDown="10" gridSize="200px" width="640px">
          {resizedImages.map((img, i) => {
            return (
              <div key={i}>
                <img
                  className="imgA1"
                  src={deleteIcon}
                  onClick={(e) => onDeleteImage(e, i, files)}
                  alt=""
                />
                <img className="preview" src={img} alt={"image-" + i} key={i} />
              </div>
            );
          })}
        </GridImages>
      )}
      <FileUploadButton type="file"  multiple onChange={onChange} />
      <button type="submit">Upload</button>
    </div>
  );
};

export default FileUpload;
