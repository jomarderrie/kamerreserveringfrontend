import axios from "axios";

export const getAllUsers = async () => {
    return await axios.get("http://localhost:8080/user/all", {
        headers: {
            authorization:
                "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
            "Access-Control-Allow-Origin": "*",
        },
    })
}

export const getHuidigeGebruikerMetToken = async (token) => {
    return await axios.post(`http://localhost:8080/user/token?token=${token}`)
}