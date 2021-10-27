import React, { useState, useContext, useEffect } from 'react'
import { FlexBoxContainerInput } from '../../styled/globals/AuthBoxContainer';
import { Controller, useForm, ErrorMessage } from "react-hook-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import DatePicker, { ReactDatePicker } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import { editKamer, maakNieuweKamer } from '../../functions/kamers';
import moment from 'moment';
import {isEmpty} from '../../helpers/IsEmpty';

export default function NieuweKamerForm({ kamer }) {
    const [submitting, setSubmitting] = useState(false);
    const [serverErrors, setServerErrors] = useState([]);
    const [selected, onChange] = useState(new Date())
    const [loading, setLoading] = useState(true)
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
        formState: { errors }
    } = useForm();

    useEffect(() => {
        console.log(kamer)
        // "naam", kamer.naam
  
        if (!isEmpty(kamer)) {
            let eindTijdDate = new Date(kamer.sluitTijd);
            let startTijdDate = new Date(kamer.startTijd);
            // register({'startTijd': moment().hour(0).minute(0).seconds(0)})
            setValue("naam", kamer.naam,)
            setValue("eindDatum", eindTijdDate)
            setValue("startDatum", startTijdDate)
            setLoading(false)
            // let a = moment().hour(eindTijdDate.getHours()).minute(0).seconds(0)
            // setValue("startTijd", moment().hour(0).minute(0).seconds(0))
            // console.log( moment().subtract(2, 'hours'));
            // setValue("startTijd", 3)
            console.log(data);
            // reset({naam:kamer.naam, startTijd: moment().hour(0).minute(0).seconds(0) })
            // reset({naam:kamer.naam})
            // console.log(setValue);
            // startTijd
            // console.log(a);
        }

    }, [kamer])


    const getStartTijd = () => {
        if (!loading) {
            return moment().hour(new Date(kamer.startTijd).getHours())
        } else {
            return moment().hour(7).minute(0)
        }
    }
    const getSluitTijd = () => {
        if (!loading) {
            return moment().hour(new Date(kamer.sluitTijd).getHours())
        } else {
            return moment().hour(17).minute(0)
        }
    }

    return (
        <form onSubmit={handleSubmit(async (data) => {
            setSubmitting(true);
            console.log(data);
            //creeer datum van object
            let startDatumObj = new Date(data.startDatum);

            let eindDatumObj = new Date(data.eindDatum)

            console.log(startDatumObj, eindDatumObj)

            //set tijd van 
            if (data.startTijd === undefined) {
                startDatumObj.setHours(17)
            } else {
                startDatumObj.setHours(data.startTijd.hours() + 2)
            }

            startDatumObj.setMinutes(0)
            startDatumObj.setSeconds(0);
            startDatumObj.setMilliseconds(0)
            if (data.startTijd === undefined) {
                startDatumObj.setHours(7)
            } else {
                eindDatumObj.setHours(data.sluitTijd.hours() + 2)
            }
            eindDatumObj.setMinutes(0)
            eindDatumObj.setSeconds(0);
            eindDatumObj.setMilliseconds(0)
            if(!isEmpty(kamer)){
                await editKamer(kamer.naam,data.naam,eindDatumObj, startDatumObj ).then((res,err) =>{
                    if (err) {
                        console.log(err);
                        toast.error("Error met het editen van een kamer")
                    } else {
                        toast.success(`Succesvol kamer veranderd`)
                        setSubmitting(false)
                        // toast.error(err)
                    }
                })
            }else{
                await maakNieuweKamer(data.naam, eindDatumObj, startDatumObj).then((res, err) => {
                if (err) {
                    console.log(err);
                    toast.error("Error met het toevoegen van een kamer")
                } else {
                    toast.success(`Succesvol nieuwe kamer toegevoegd met naam ${data.naam}`)
                    setSubmitting(false)
                    // toast.error(err)
                }
            })
            }
            history.push("/kamers")


        })}>
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
                        render={({ field: { onChange, value } }) => {
                            return (
                                <TimePicker
                                    onChange={onChange}
                                    // defaultValue={() => getStartTijd()}
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

                    render={({ field: { onChange, value } }) => {
                        return (
                            <TimePicker
                                onChange={onChange}
                                selected={value}
                                // defaultValue={() =>getSluitTijd()}
                                showMinute={false}
                                showSecond={false}
                            />
                        );
                    }}
                />
                {errors.sluitTijd && <p>{errors.sluitTijd.message}</p>}
            </FlexBoxContainerInput>





            <FlexBoxContainerInput z={"column"}>
                <button type="submit" className={"submit-auth-btn"}>
                    Submit
                </button>
            </FlexBoxContainerInput>
        </form>
    )
}
