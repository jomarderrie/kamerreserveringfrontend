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
import { FlexBox } from "../../styled/styles";
const FileUpload = ({ naam, onFormSubmit, checkFiles, files, resizedImages, setImages, setFiles }) => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);



  const setPreviewImages = (files) => {
    let images = [];
    files.forEach((item) => {
      let urlImage = URL.createObjectURL(item);
      images.push(urlImage);
    });
    console.log(images, "images");
    setImages(images);
  };

  const onChange = (e) => {
    let arrayFormFiles = Array.from(e.target.files);
    console.log(arrayFormFiles, "ar");
    if (e.target.files.length !== 0) {
      if (parseInt(e.target.files.length) < 8) {
        if (checkFiles(arrayFormFiles)) {
          setFiles(arrayFormFiles);
          setPreviewImages(arrayFormFiles);
        }
      }
    } else {
      toast.error("maximum 8 images");
    }

  };

  const onDeleteImage = (e, index, files) => {
    e.preventDefault();
    let copyFileArray = files.slice();
    copyFileArray.splice(index, 1)
    setFiles(copyFileArray)
    setPreviewImages(copyFileArray)
    console.log(files, "afterdelete");
  };
  // onSubmit={(e) => onFormSubmit(e)}
  return (
    <div style={{ width: "100%" }}>
      <label htmlFor="files">Images</label>
      <FileUploadButton type="file" name="files" accept="image/png, image/jpg, image/jpeg" multiple onChange={onChange} />
      {resizedImages !== null && (
        <GridImages display={"grid"} gridSize="200px" upDown="10" width="100%">
          {resizedImages.map((img, i) => {
            return (
              img !== "" &&
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

    </div>
  );
};

export default FileUpload;
