import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { FlexBoxContainerInput } from "../../styled/globals/AuthBoxContainer";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../functions/auth";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import {setAuthToken} from "../../helpers/setAuthTokenz"
const LoginForm = () => {
  const { user, setUser, token, setToken } = useContext(AuthContext);
  let history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [submitting, setSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);

  const roleBasedRedirect = () => {
    console.log(history);
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      // if (res.role === "ROLE_ADMIN") {
      //     history.push("/admin/kamers")
      // } else {
          history.push("/kamers")
      // }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setSubmitting(true);
        if (!(!data || !data.wachtwoord || !data.email)) {
          console.log(data, "data");
          await loginUser(data.email, data.wachtwoord)
            .then((resp, err) => {
              if (err) {
                console.log(err);
                toast.error("Error met het inloggen");
              } else {   
                setUser(resp.data);
                setToken("Basic " + window.btoa(data.email + ":" + data.wachtwoord))

                toast.success("Succesvol ingelogd");
                roleBasedRedirect();
                setSubmitting(false);

              }
            })
            .catch((err) => {
              console.log(err);
              toast.error("Error met het inloggen");
              // toast.error("error")
              // console.log(err.response);
            });
        }else{
            toast.error("Inlog velden zijn niet juist ingevult");
        }
        // await loginUser("admin@gmail.com", "AdminUser!1").then((resp, err) => {
        //     if (err) {
        //         console.log(err);
        //         toast.error("Error met het inloggen")
        //     } else {
        //         toast.success("Succesvol ingelogd")
        //         setUser(resp.data)
        //         console.log(resp.data);
        //         roleBasedRedirect(resp.data)
        //         setSubmitting(false)

        //         // toast.error(err)
        //     }
        // }).catch(err => {
        //     console.log(err);
        //     toast.error("Error met het inloggen")
        //     // toast.error("error")
        //     // console.log(err.response);
        // })
        // await loginUser(data.email, data.wachtwoord).then((resp) => {
        //     setUser(resp.data)

        //     console.log(resp.data);
        // })
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
        <label htmlFor="email">Email</label>

        <input
          {...register("email", {
            // required: "Vul alstublieft in",
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </FlexBoxContainerInput>

      <FlexBoxContainerInput z={"column"} y={"none"}>
        <label htmlFor="wachtwoord">Wachtwoord</label>

        <input
          type="password"
          {...register("wachtwoord", {
            // required: "Vul alstublieft in"
          })}
        />
        {errors.wachtwoord && <p>{errors.wachtwoord.message}</p>}
      </FlexBoxContainerInput>

      <FlexBoxContainerInput z={"column"}>
        <button type="submit" className={"submit-auth-btn"} onClick>
          Login
        </button>
      </FlexBoxContainerInput>
    </form>
  );
};

export default LoginForm;
