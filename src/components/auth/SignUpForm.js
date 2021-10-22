import React, {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import {FlexBox} from "../../styled/styles";
import styled from "styled-components";
import {FlexBoxContainerInput} from "../../styled/globals/AuthBoxContainer";
import {createUser} from "../../functions/auth";

export default function SignUpForm() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const [submitting, setSubmitting] = useState(false);
    const [serverErrors, setServerErrors] = useState([]);
    // const reRef = useRef<ReCAPTCHA>();

    return (
        <FlexBox>
            <form
                onSubmit={handleSubmit(async (formData) => {
                    setSubmitting(true);
                    console.log(formData)
                    setServerErrors([]);
                    // await createUser(formData.naam, formData.achterNaam, formData.email, formData.wachtwoord, formData.terms).then((resp, err) => {
                    //     if (resp.data){
                    //
                    //     }else{
                    //
                    //     }
                    //     console.log(resp)
                    // })

                    await createUser("log", "gemieee", "nathangemieee@gmail.com","Nathanj!k2", true).then((resp, err) => {
                        if (resp.data){

                        }else{

                        }
                        console.log(resp)
                    })

                    // const token = await reRef.current.executeAsync();
                    // reRef.current.reset();
                    // try{
                    //     await createUser()
                    // }
                    // const response = await fetch("/api/auth", {
                    //     method: "POST",
                    //     headers: {
                    //         "Content-Type": "application/json",
                    //     },
                    //     body: JSON.stringify({
                    //         name: formData.name,
                    //         email: formData.email,
                    //         password: formData.password,
                    //         terms: formData.terms,
                    //         // token,
                    //     }),
                    // });
                    // const data = await response.json();
                    //
                    // if (data.errors) {
                    //     setServerErrors(data.errors);
                    // } else {
                    //     console.log("success, redirect to home page");
                    // }

                    setSubmitting(false);
                })}
            >
                {/*<ReCAPTCHA*/}
                {/*    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}*/}
                {/*    size="invisible"*/}
                {/*    // ref={reRef}*/}
                {/*/>*/}

                {serverErrors && (
                    <ul>
                        {serverErrors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}
                <FlexBoxContainerInput z={"column"} y={"none"}>
                    <label htmlFor="naam">Naam</label>
                    <input
                        {...register("naam", {required: "Vul alstublieft in"})}
                        id="naam"
                    />
                    {errors.naam && <p>{errors.naam.message}</p>}
                </FlexBoxContainerInput>
                <FlexBoxContainerInput z={"column"} y={"none"}>
                    <label htmlFor="achterNaam">Achternaam</label>
                    <input
                        {...register("achterNaam", {
                            required: "Vul alstublieft in",
                        })}
                    />
                    {errors.achterNaam && <p>{errors.achterNaam.message}</p>}
                </FlexBoxContainerInput>

                <FlexBoxContainerInput z={"column"} y={"none"}>

                    <label htmlFor="email">Email</label>

                    <input
                        {...register("email", {
                            required: "Vul alstublieft in",

                            minLength: {value: 4, message: "Valid email"}
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </FlexBoxContainerInput>


                <FlexBoxContainerInput z={"column"} y={"none"}>

                    <label htmlFor="wachtwoord">Wachtwoord</label>

                    <input
                        type="password"
                        {...register("wachtwoord", {
                            required: "Vul alstublieft in"
                        })}
                    />
                    {errors.wachtwoord && <p>{errors.wachtwoord.message}</p>}
                </FlexBoxContainerInput>


                <FlexBoxContainerInput z={"row"} x={"flex-start"}>
                    <input
                        type="checkbox"
                        className={"checkbox-input"}
                        {...register("terms", {required: "Accepteer de terms of services alstublieft"})}

                    />
                    <label htmlFor="terms" style={{paddingRight: "20px"}}>Servicevoorwaarden van gebruik</label>
                </FlexBoxContainerInput>


                <FlexBoxContainerInput z={"column"}>
                    <button type="submit" className={"submit-auth-btn"}>
                        Register
                    </button>
                    <p>When you "Continue", you agree to Kamer Reservering Terms of Service. We will manage information
                        about you as described in our Privacy Policy, and Cookie Policy.</p>
                </FlexBoxContainerInput>

            </form>
        </FlexBox>
    );
}
// width420



