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
import { uploadKamerImage, uploadKamerImages } from './../../functions/images';
import UploadFile from "./FileUpload";

export default function NieuweKamerForm({ kamer, loading, naam }) {
  const [submitting, setSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [selected, onChange] = useState(new Date());
  const [image, setImage] = useState(undefined);
  //   const { naam } = match.params;

  let history = useHistory();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    data,
    reset,
    value,
    // defaultValues: {"startTijd":moment().hour(0).minute(0).seconds(0)},
    formState: { errors },
  } = useForm();

  // moment().hour(7).minute(0).seconds(0)
  useEffect(() => {
    if (!isEmpty(kamer)) {
      let eindTijdDate = new Date(kamer.sluitTijd);
      let startTijdDate = new Date(kamer.startTijd);
      setValue("naam", kamer.naam);
      setValue("eindDatum", eindTijdDate);
      setValue("startDatum", startTijdDate);
    }
  }, [kamer]);

  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [imageName, setImageName] = useState("");

  const handleFileChange = (e) => {
      e.preventDefault();
    let formData = new FormData(); 
    const arData = new FormData();

    arData.append("file", e.target.files[0],"f")
    
    uploadKamerImage("Kamer1", arData);
    
    Array.from(e.target.files).forEach((image,index) => {
      console.log(image, "image " + index);
      formData.append("files", image, image.name);
  });
      // formData.append('files',e.target.files[0]);
      
   
      for (var [key, value] of formData.entries()) { 
        console.log(key, value , 'k');
       }
       uploadKamerImage("kamer1", arData)
      // console.log(formData, "formdata");
      uploadKamerImages("Kamer1",formData)
    // console.log(e.target.files, "hey");
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setSubmitting(true);
        // let file = data.kamer_fotos[0];
        // let reader = new FileReader();
        // reader.onloadend = () =>{
        //     console.log(reader.result);
        // }
        // reader.readAsDataURL(file);
        // if (event.target.files.length === 0) {
        // return;
        //   }
        //   const file = event.target.files[0];
        //   let reader = new FileReader();
        //   reader.onloadend = () => {
        //     dispatch({ type: 'select-file', payload: reader.result });
        //   };
        //   reader.readAsDataURL(file);
        console.log(data);
        //creeer datum van object
        let startDatumObj = new Date(data.startDatum);

        let eindDatumObj = new Date(data.eindDatum);

        //set tijd van
        if (data.startTijd === undefined) {
          startDatumObj.setHours(17);
        } else {
          startDatumObj.setHours(data.startTijd.hours() + 2);
        }

        startDatumObj.setMinutes(0);
        startDatumObj.setSeconds(0);
        startDatumObj.setMilliseconds(0);
        if (data.startTijd === undefined) {
          startDatumObj.setHours(7);
        } else {
          eindDatumObj.setHours(data.sluitTijd.hours() + 2);
        }
        eindDatumObj.setMinutes(0);
        eindDatumObj.setSeconds(0);
        eindDatumObj.setMilliseconds(0);
        if (!isEmpty(kamer)) {
          await editKamer(kamer.naam, data.naam, eindDatumObj, startDatumObj)
            .then((res, err) => {
              if (err) {
                console.log(err);
                toast.error("Error met het editen van een kamer");
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
                toast.error("Error met het toevoegen van een kamer");
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
        <FlexBoxContainerInput z={"column"} y={"none"}>
          <label htmlFor="startTijd">Start tijd</label>
          <Controller
            // {...register("startTijd", {
            //   // required: "Vul alstublieft in",
            // })}
            // value={startTijd}
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
                    ) : kamer === {} ? (
                      <div>Loading...</div>
                    ) : (
                      moment()
                        .hour(new Date(kamer.startTijd).getHours())
                        .seconds(0)
                        .minutes(0)
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
      {/* {kamer==={}||kamer===undefined?<div>hey</div>:<div>hey123</div>} */}
      {/* {kamer!=={}?<div>hey</div>:div>not hey</div>} */}
      {/* {} */}

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

      <FlexContainerFileInput z={"column"} y={"none"}>
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
      </FlexContainerFileInput>

      <FlexBoxContainerInput z={"column"}>
        <button type="submit" className={"submit-auth-btn"}>
          Submit
        </button>
      </FlexBoxContainerInput>
    </form>
  );
}
