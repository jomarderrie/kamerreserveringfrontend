import axios, { post } from "axios";



export const uploadKamerImagesPost = async (naam, formData, token) => {
  const url = `http://localhost:8080/images/kamer/${naam}/upload/images`;
  const config = {
    headers: {
      authorization:
          "Basic " + token,
      "Access-Control-Allow-Origin": "*",
      'content-type': 'multipart/form-data'
    }
  }

  post(url, formData, config)
}

export const uploadKamerImage = async (naam, file, token) => {
  await axios.post(
    `http://localhost:8080/images/kamer/${naam}/upload/image`,
    { file },
    {
      headers: {
        authorization:
            "Basic " + token,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data"
      },
    }
  );
};


export const uploadKamerImages = async (naam, formData, token) => {

  const url = `http://localhost:8080/images/kamer/${naam}/upload/images`;
  const config = {
    headers: {
      authorization:
          "Basic " + token,
      "Access-Control-Allow-Origin": "*",
      "content-type": "multipart/form-data",
    },
  };
  return await post(url, formData, config);
}
// "/user/upload"

export const uploadProfileImage = async (formData, token) => {
  const url = `http://localhost:8080/images/user/upload`;
  const config = {
    headers: {
      authorization:
          "Basic " + token,
      "Access-Control-Allow-Origin": "*",
      "content-type": "multipart/form-data",
    },
  };
  return await post(url, formData, config);
}

export const deleteProfileImage = async (email,token) => {
  console.log("email" , email)
  return await axios.delete(`http://localhost:8080/images/user/${email}/image/delete`, {
    headers: {
      authorization:
          "Basic " + token,
      "Access-Control-Allow-Origin": "*",
      "content-type": "multipart/form-data",
    },
  })
}