import axios from "axios";

export const uploadKamerImages = async (naam, files) => {
  console.log("files", files);
  await axios.post(
    `http://localhost:8080/images/kamer/${naam}/upload/images`,
    { files:files },
    {
      headers: {
        authorization:
          "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};


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
  