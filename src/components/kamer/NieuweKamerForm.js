import React, { useState, useContext } from 'react'
import { FlexBoxContainerInput } from '../../styled/globals/AuthBoxContainer';
import { Controller, useForm, ErrorMessage } from "react-hook-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import DatePicker, { ReactDatePicker } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';

export default function NieuweKamerForm() {
    const [submitting, setSubmitting] = useState(false);
    const [serverErrors, setServerErrors] = useState([]);
    const [selected, onChange] = useState(new Date())

    let history = useHistory();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm();





    return (
        <form onSubmit={handleSubmit(async (data) => {
            setSubmitting(true);
            console.log(data);
            let startDatum = new Date(data.startDatum);
            date.setHours(data.sluitTijd.hours())
            let eindDatum = new Date(data.eindDatum)

            // date.setTime(data.sluitTijd._i)
            console.log(data.sluitTijd.hours())
            // console.log(ok);
            // toast.error("error")
            // console.log(err.response);

            // await loginUser(data.email, data.wachtwoord).then((resp) => {
            //     setUser(resp.data)

            //     console.log(resp.data);
            // })


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






            <FlexBoxContainerInput z={"column"} y={"none"}>
                <label htmlFor="startTijd">Start tijd</label>
                <Controller
                    name={"startTijd"}
                    control={control}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <TimePicker
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
