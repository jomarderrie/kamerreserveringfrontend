import axios from "axios";

export const getAllKamers = async () => await axios.get('http://localhost:8080/kamer/all', { headers: { authorization: 'Basic ' + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"), "Access-Control-Allow-Origin": "*"  }});

export const getSingleKamer = async (kamerNaam) =>
    await axios.get(`http://localhost:8080/kamer/${kamerNaam}`, { headers: { authorization: 'Basic ' + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"), "Access-Control-Allow-Origin": "*"  }});

export const maakNieuweKamer = async (naam,sluitTijd, startTijd) =>{
    console.log(naam,sluitTijd, startTijd);
    await axios.post("http://localhost:8080/kamer/new",{naam, sluit:sluitTijd,start:startTijd},  { headers: { authorization: 'Basic ' + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"), "Access-Control-Allow-Origin": "*"  }})
}

export const editKamer = async (vorigeNaam,naam,sluitTijd, startTijd) =>{
    console.log(vorigeNaam,naam,sluitTijd, startTijd);
    await axios.put(`http://localhost:8080/kamer/edit/${vorigeNaam}`,{naam, sluit:sluitTijd,start:startTijd},  { headers: { authorization: 'Basic ' + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"), "Access-Control-Allow-Origin": "*"  }})
}

export const deleteKamer = async (naam) =>{
    await axios.delete(`http://localhost:8080/kamer/delete/${naam}`,  { headers: { authorization: 'Basic ' + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"), "Access-Control-Allow-Origin": "*"  }})
}

export const maakNieuweReservatie = async (naam, startTijd, eindTijd) =>{
    await axios.post(`http://localhost:8080/kamer/${naam}/reserveer`, {startTijd, eindTijd}, { headers: { authorization: 'Basic ' + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"), "Access-Control-Allow-Origin": "*"  }})
}

export const getImageFromDb = async(kamerNaam,naamImage) => {
    return await axios.get(`http://localhost:8080/images/kamer/${kamerNaam}/${naamImage}`, { 
        responseType:"blob",
        headers: { authorization: 'Basic ' + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"), "Access-Control-Allow-Origin": "*"  }}).then(data =>{
            return data;
        })
  
}
