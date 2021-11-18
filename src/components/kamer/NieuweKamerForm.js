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
import FileUpload from "./FileUpload";

export default function NieuweKamerForm({ kamer, loading, naam,setNaam }) {
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



  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setSubmitting(true);
        console.log(data, "data");
        //creeer datum van object
        let startDatumObj = new Date(data.startDatum);

        let eindDatumObj = new Date(data.eindDatum);

        //set tijd van
        if (data.startTijd === undefined) {
          startDatumObj.setHours(7);
        } else {
          startDatumObj.setHours(data.startTijd.hours()   );
        }

        startDatumObj.setMinutes(0);
        startDatumObj.setSeconds(0);
        startDatumObj.setMilliseconds(0);
        if (data.sluitTijd === undefined) {
          eindDatumObj.setHours(17);
        } else {
          eindDatumObj.setHours(data.sluitTijd.hours() );
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
      <FileUpload/>
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
