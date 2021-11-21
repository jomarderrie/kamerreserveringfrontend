import React, { useState, useContext, useEffect } from "react";
import {
  FlexBoxContainerInput,
  FlexContainerFileInput,
} from "../../styled/globals/AuthBoxContainer";
import { Controller, useForm, ErrorMessage } from "react-hook-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import DatePicker, { ReactDatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "rc-time-picker/assets/index.css";
import TimePicker from "rc-time-picker";
import { editKamer, maakNieuweKamer } from "../../functions/kamers";
import moment from "moment";
import { isEmpty } from "../../helpers/IsEmpty";
import { uploadKamerImage, uploadKamerImages } from "./../../functions/images";
import FileUpload from "./FileUpload";
import styled  from 'styled-components';
import { isFiletypeImage } from './../../helpers/detectFileTypeIsImage';
import { post } from 'axios';
export default function NieuweKamerForm({ kamer, naam, setNaam }) {
  const [submitting, setSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [selected, onChange] = useState(new Date());
  const [image, setImage] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState(null);
  const [resizedImages, setImages] = useState(null);

  let history = useHistory();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    data,
    reset,
    value,

    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (kamer !== undefined) {
      if (!isEmpty(kamer)) {
        let eindTijdDate = new Date(kamer.sluitTijd);
        let startTijdDate = new Date(kamer.startTijd);
        setValue("naam", kamer.naam);
        setValue("eindDatum", eindTijdDate);
        setValue("startDatum", startTijdDate);
        setLoading(false);
      }
    }else{
      setLoading(false);
    }
  }, [kamer]);

  const checkFiles = (files) => {
   
    for (let index = 0; index < files.length; index++) {
      if (!isFiletypeImage(files[index].type)) {
        toast.error("File types alleen jpeg, jpg of png");
        return false;
      }
    }
    return true;
  };


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


  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setSubmitting(true);
        //creeer datum van object
        let startDatumObj = new Date(data.startDatum);

        let eindDatumObj = new Date(data.eindDatum);

        //set tijd van
        if (data.startTijd === undefined) {
          startDatumObj.setHours(7);
        } else {
          startDatumObj.setHours(data.startTijd.hours());
        }

        startDatumObj.setMinutes(0);
        startDatumObj.setSeconds(0);
        startDatumObj.setMilliseconds(0);
        if (data.sluitTijd === undefined) {
          eindDatumObj.setHours(17);
        } else {
          eindDatumObj.setHours(data.sluitTijd.hours());
        }
        eindDatumObj.setMinutes(0);
        eindDatumObj.setSeconds(0);
        eindDatumObj.setMilliseconds(0);
        setNaam(data.naam);
        if (!isEmpty(kamer)) {
          await editKamer(kamer.naam, data.naam, eindDatumObj, startDatumObj)
            .then((res, err) => {
              if (err) {
                console.log(err);
              } else {
                toast.success(`Succesvol kamer veranderd`);
                setSubmitting(false);
                // toast.error(err)
              }
            })
            .catch((err) => {
              toast.error(err.response.data.message);
              return Promise.reject(err);
            });
        } else {
          await maakNieuweKamer(data.naam, eindDatumObj, startDatumObj)
            .then((res, err) => {
              if (err) {
                console.log(err);
              } else {
                toast.success(
                  `Succesvol nieuwe kamer toegevoegd met naam ${data.naam}`
                );
                setSubmitting(false);
                // toast.error(err)
              }
            })
            .catch((err) => {
              toast.error(err.response.data.message);
              return Promise.reject(err);
            });
        }
        history.push("/kamers");
      })}
    >
      <FlexBoxContainerInput>
        {serverErrors && (
          <ul>
            {serverErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </FlexBoxContainerInput>
      <FlexBoxContainerInput z={"column"} y={"none"}>
        <label htmlFor="naam">Naam van kamer</label>

        <input
          {...register("naam", {
            // required: "Vul alstublieft in",
          })}
        />
        {errors.naam && <p>{errors.naam.message}</p>}
      </FlexBoxContainerInput>

      <FlexBoxContainerInput z={"column"} y={"none"}>
        <label htmlFor="startDatum">Start datum</label>
        <Controller
          name={"startDatum"}
          control={control}
          defaultValue={new Date()}
          render={({ field: { onChange, value } }) => {
            return (
              <DatePicker
                onChange={onChange}
                dateFormat="dd/MM/yyyy"
                selected={value}
              />
            );
          }}
        />
        {errors.StartDatum && <p>{errors.StartDatum.message}</p>}
      </FlexBoxContainerInput>
      <FlexBoxContainerInput z={"column"} y={"none"}>
        <label htmlFor="eindDatum">Eind datum</label>
        <Controller
          name={"eindDatum"}
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <DatePicker
                dateFormat="dd/MM/yyyy"
                onChange={onChange}
                selected={value}
              />
            );
          }}
        />
        {errors.eindDatum && <p>{errors.eindDatum.message}</p>}
      </FlexBoxContainerInput>

      {
        loading?<div>loading...</div>:
        <FlexBoxContainerInput z={"column"} y={"none"}>
          <label htmlFor="startTijd">Start tijd</label>
          <Controller
            name={"startTijd"}
            control={control}
            render={({ field: { onChange, value }, ref }) => {
              return (
                <TimePicker
                  inputRef={ref}
                  {...register("startTijd", {
                    // required: "Vul alstublieft in",
                  })}
                  defaultValue={
                    kamer === undefined ? (
                      moment().hour(7).seconds(0).minute(0)
                    ) : kamer !== {} ? (
                      moment()
                        .hour(new Date(kamer.startTijd).getHours())
                        .seconds(0)
                        .minutes(0)
                    ) : (
                      <div>Loading...</div>
                    )
                  }
                  onChange={onChange}
                  selected={value}
                  showMinute={false}
                  showSecond={false}
                />
              );
            }}
          />
          {errors.startTijd && <p>{errors.startTijd.message}</p>}
        </FlexBoxContainerInput>
      }
      {
        loading?<div>loading...</div>:
      <FlexBoxContainerInput z={"column"} y={"none"}>
        <label htmlFor="sluitTijd">Sluit tijd</label>
        <Controller
          name={"sluitTijd"}
          control={control}
          render={({ field: { onChange, value }, ref }) => {
            return (
              <TimePicker
                {...register("sluitTijd", {
                  // required: "Vul alstublieft in",
                })}
                onChange={onChange}
                inputRef={ref}
                selected={value}
                defaultValue={
                  kamer === undefined ? (
                    moment().hour(17).seconds(0).minute(0)
                  ) : kamer !== {} ? (
                    moment()
                      .hour(new Date(kamer.sluitTijd).getHours())
                      .seconds(0)
                      .minutes(0)
                  ) : (
                    <div>Loading...</div>
                  )
                }
                // defaultValue={() =>getSluitTijd()}
                showMinute={false}
                showSecond={false}
              />
            );
          }}
        />
        {errors.sluitTijd && <p>{errors.sluitTijd.message}</p>}
      </FlexBoxContainerInput>
      }
      <FlexBoxContainerInput x="flex-start">
        <FileUpload checkFiles={checkFiles} onFormSubmit={onFormSubmit}/>
      </FlexBoxContainerInput>
      {/* <FlexContainerFileInput z={"column"} y={"none"}>
        <label htmlFor="kamer_fotos">Kamer foto's</label>

        <input
          {...register("kamer_fotos")}
          type="file"
          name="kamer_fotos"
          onChange={handleFileChange}
          className={"kamer_foto"}
          multiple
          accept="image/png, image/jpeg"
        ></input>
        {errors.kamer_fotos && <p>{errors.kamer_fotos.message}</p>}
      </FlexContainerFileInput> */}

      <FlexBoxContainerInput z={"column"}>
        <button type="submit" className={"submit-auth-btn"}>
          Submit
        </button>
      </FlexBoxContainerInput>
    </form>
  );
}


