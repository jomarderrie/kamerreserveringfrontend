import axios from "axios";

export const getAllKamers = async () => await axios.get('http://localhost:8080/kamer/all', { headers: { authorization: 'Basic ' + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"), "Access-Control-Allow-Origin": "*"  }});

export const getSingleKamer = async (kamerNaam) =>
    await axios.get(`http://localhost:8080/kamer/${kamerNaam}`, { headers: { authorization: 'Basic ' + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"), "Access-Control-Allow-Origin": "*"  }});

export const maakNieuweKamer = (naam,) =>{

}