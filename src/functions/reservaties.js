import axios from "axios";

export const getAllReservatiesForUser = async(email) =>{
    return await axios.get(`http://localhost:8080/${email}/all`,  {
        headers: {
            authorization:
                "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
            "Access-Control-Allow-Origin": "*",
        },
    })
}

export const getAllReservaties = async() =>{
    return await axios.get(`http://localhost:8080/all`,  {
        headers: {
            authorization:
                "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
            "Access-Control-Allow-Origin": "*",
        },
    })
}