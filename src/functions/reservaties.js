import axios from "axios";

export const getAllReservatiesForUser = async(email, token) =>
  await axios.get(`http://localhost:8080/reservaties/${email}/alles`,  {
        headers: {
            authorization:
                "Basic " + token,
            "Access-Control-Allow-Origin": "*",
        },
    })


export const getAllReservaties = async(token) =>
     await axios.get(`http://localhost:8080/alles`,  {
        headers: {
            authorization:
                "Basic " + token,
            "Access-Control-Allow-Origin": "*",
        },
    })
