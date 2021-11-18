import axios,{post} from "axios";

export const uploadKamerImages = async (naam, formData) => {
  await axios.post(
    `http://localhost:8080/images/kamer/${naam}/upload/images`,
     formData ,
    {
      headers: {
        authorization:
          "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
        "Access-Control-Allow-Origin": "*",
        'content-type': 'multipart/form-data'
      },
    }
  );
};

export const uploadKamerImagesPost = async(naam,formData) => {
    const url = `http://localhost:8080/images/kamer/${naam}/upload/images`;
    const config = {
        headers: {
            authorization:
            "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
          "Access-Control-Allow-Origin": "*",
            'content-type': 'multipart/form-data'
        }
    }
    
    post(url, formData, config)
}

export const uploadKamerImage = async (naam, file) => {
    await axios.post(
      `http://localhost:8080/images/kamer/${naam}/upload/image`,
      { file },
      {
        headers: {
          authorization:
            "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data" 
        },
      }
    );
  };
  