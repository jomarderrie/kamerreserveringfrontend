import axios from "axios";

export const getAllReservatiesPaginatedForUser = async(email,huidgePagina, pageSize, sortBy, token) =>
  await axios.get(`http://localhost:8080/reservaties/${email}/alles?pageNo=${huidgePagina}&pageSize=${pageSize}`,  {
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
