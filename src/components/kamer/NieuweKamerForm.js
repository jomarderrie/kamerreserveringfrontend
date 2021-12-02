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
import styled from "styled-components";
import { isFiletypeImage } from "./../../helpers/detectFileTypeIsImage";
import { post } from "axios";
import { getImageFromDb } from "./../../functions/kamers";
import { loginUser } from "../../functions/auth";
import { getImagesFromDbAndFiles } from "../../helpers/getImagesFromDb";
export default function NieuweKamerForm({ kamer, naam, setNaam }) {
  const [submitting, setSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [selected, onChange] = useState(new Date());
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
        let dataImages = [];
        console.log(kamer, "kmaer");
        // kamer.attachments.
        let eindTijdDate = new Date(kamer.sluitTijd);
        let startTijdDate = new Date(kamer.startTijd);
        setValue("naam", kamer.naam);
        setValue("eindDatum", eindTijdDate);
        setValue("startDatum", startTijdDate);
        getImagesFromDbAndFiles(kamer.naam, kamer.attachments, true).then(
          (res) => {
            setImages(res[0]);
            setFiles(res[1]);
            setLoading(false);
          }
        );
      }
    } else {
      setLoading(false);
    }
  }, [kamer]);

  // const getImagesFromDbAndFiles = async (kamerNaam, fileAttachments, file) => {
  //   const images = [];
  //   const files = [];
  //   for (const fileAttachment of fileAttachments) {
  //     await getImageFromDb(kamerNaam, fileAttachment.name).then((k) => {
  //       let fileName = k.config.url.split("/").slice(6, k.length);
  //       const file = new File([k.data], fileName, { type: k.data.type });
  //       files.push(file);
  //       images.push(URL.createObjectURL(k.data));
  //     });
  //   }
  //   setFiles(files);
  //   [...files].forEach((file) => console.log(file, "kek"));
  //   return images;
  // };

  const checkFiles = (files) => {
    for (let index = 0; index < files.length; index++) {
      if (!isFiletypeImage(files[index].type)) {
        toast.error("File types alleen jpeg, jpg of png");
        return false;
      }
    }
    return true;
  };

  const onFormSubmit = (naam) => {
    // sendFilesToBackend(files);
    if (files !== [] || files.length !==0) {
      checkFiles(files);
      const url = `http://localhost:8080/images/kamer/${naam}/upload/images`;
      const formData = new FormData();
      Array.from(files).forEach((image, index) => {
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

  const sendRoomImages = async (naam, files) => {
    // sendFilesToBackend(files);
    if (files !== []) {
      checkFiles(files);
      const formData = new FormData();

      files.forEach((image, index) => {
        console.log(image, "image " + index);
        formData.append("files", image, image.name);
      });
      uploadKamerImages(naam, formData);
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
        // setNaam(data.naam);
        if (!isEmpty(kamer)) {
          await editKamer(kamer.naam, data.naam, eindDatumObj, startDatumObj)
            .then((res, err) => {
              if (err) {
                console.log(err);
              } else {
                onFormSubmit(data.naam)
                  .then((res, err) => {
                    if (err) {
                      console.log(err);
                      toast.error("Error met het submitten van een kamer");
                      setSubmitting(false);
                    } else {
                      history.push("/kamers");
                      toast.success(`Succesvol kamer veranderd`);
                      setSubmitting(false);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.error("Error met het submitten van een kamer");
                    setSubmitting(false);
                    return Promise.reject(err);
                  });
              }
            })
            .catch((err) => {
              console.log(err);
              setSubmitting(false);
              toast.error(err.response.data.message);
              return Promise.reject(err);
            });
        } else {
          await maakNieuweKamer(data.naam, eindDatumObj, startDatumObj)
            .then((res, err) => {
              if (err) {
                console.log(err);
              } else {
                onFormSubmit(data.naam)
                  .then((res, err) => {
                    if (res) {
                      history.push("/kamers");
                      toast.success(
                        `Succesvol nieuwe kamer toegevoegd met naam ${data.naam}`
                      );
                      setSubmitting(false);
                    } else {
                      console.log(err);
                    }
                  })
                  .catch((err) => console.log(err));
                // toast.error(err)
              }
            })
            .catch((err) => {
              console.log(err);
              setSubmitting(false);
              toast.error(err.response.data.message);
              return Promise.reject(err);
            });
        }
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

      {loading ? (
        <div>loading...</div>
      ) : (
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
      )}
      {loading ? (
        <div>loading...</div>
      ) : (
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
      )}
      <FlexBoxContainerInput x="flex-start">
        <FileUpload
          checkFiles={checkFiles}
          files={files}
          setFiles={setFiles}
          resizedImages={resizedImages}
          setImages={setImages}
        />
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
