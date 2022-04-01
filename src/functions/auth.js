import axios from "axios";

export const createUser = async (
  naam,
  achterNaam,
  email,
  wachtwoord,
  terms
) => {
  return await axios.post(
    `http://localhost:8080/user/register`,
    { naam, achterNaam, email, wachtwoord, terms },
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};

export const loginUser = async (email, wachtwoord) => {
  return (
    await axios.post(`http://localhost:8080/user/login`, { email, wachtwoord },
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
  );
};
