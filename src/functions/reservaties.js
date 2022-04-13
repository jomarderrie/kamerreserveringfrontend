import axios from "axios";

// todo sortby not implemented
export const getAllReservatiesPaginatedForUser = async(email,huidgePagina, pageSize, sortBy, token) =>
  await axios.get(`http://localhost:8080/reservaties/${email}/alles?pageNo=${huidgePagina}&pageSize=${pageSize}`,  {
        headers: {
            authorization:
                "Basic " + token,
            "Access-Control-Allow-Origin": "*",
        },
    })


export const getAllReservaties = async(huidgePagina, pageSize, sortBy, token) =>
     await axios.get(`http://localhost:8080/reservaties/admin/alles?pageNo=${huidgePagina}&pageSize=${pageSize}`,  {
        headers: {
            authorization:
                "Basic " + token,
            "Access-Control-Allow-Origin": "*",
        },
    })
