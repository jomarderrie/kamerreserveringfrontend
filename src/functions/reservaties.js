import axios from "axios";

export const getAllReservatiesForUser = async(email) =>
  await axios.get(`http://localhost:8080/${email}/alles`,  {
        headers: {
            authorization:
                "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
            "Access-Control-Allow-Origin": "*",
        },
    })


export const getAllReservaties = async() =>
     await axios.get(`http://localhost:8080/alles`,  {
        headers: {
            authorization:
                "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
            "Access-Control-Allow-Origin": "*",
        },
    })
