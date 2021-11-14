import React, { Component, useContext, useState, useEffect } from "react";
import { FlexBox } from "../../styled/styles";
import DatePicker from "react-datepicker";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Image } from "../../styled/Image";
import { getImageFromDb } from "../../functions/kamers";
import axios from "axios";

const KamerCard = ({ kamer, deleteKamer, image }) => {
  const { user } = useContext(AuthContext);
  const [kamerImages, setKamerImages] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // axios
    //   .get(`http://localhost:8080/images/kamer/ok/Monkey_chathead.png`, {
    //     headers: {
    //       authorization:
    //         "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   })
    //   .then((k) => {
    //     console.log(k);
    //     setKamerImages(k.data);
    //   });

    showKamerImage().then((l) => {
      setLoading(false);
      console.log(l, "smak");
    });
    // console.log(showKamerImage(), "mek");
    // getImageFromDb("Monkey_chathead.png").then((k) =>{
    //     console.log(k,"dapata");
    // })
  }, []);

  const showKamerImage = async () => {
    setLoading(true);
    return await axios
      .get(`http://localhost:8080/images/kamer/ok/Monkey_chathead.png`, {
        responseType:"blob",
        headers: {
          authorization:
            "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
          "Access-Control-Allow-Origin": "*",
        }
      })
      .then((k) => {
        setKamerImages(k);
        setLoading(false);
      });
  };

  const k = () => {
      console.log(kamerImages, "kamer");
      let blob = new Blob(
        [kamerImages.data], 
        { type: kamerImages.data }
      )
    //   console.log(kamerImages.data.type);
      let image = URL.createObjectURL(blob)

    return <img src={image} />;
  };

  return (
    <FlexBox z={"column"}>
      {/* {showKamerImage()} */}

      {/* <img src={() =>getImageFromDb().then((l) =>console.log(l, "oekoek"))}/> */}
      {/* {image!==null&& <Image src} */}
      {/* <div>sadjasjdjasjkdaskdjashdkjaskjdsajdkjasdkasdjhsakjdkjsadkja</div> */}
      {/* {(kamerImages === "") ? <div>sadjasjdjasjkdaskdjashdkjaskjdsajdkjasdkasdjhsakjdkjsadkja</div>:<img src={`data:image/png;base64,${kamerImages}`} alt="" />}
       */}
      {loading ? <div>...loading...</div> : k()}
      {() => showKamerImage()}
      <Link to={`/kamer/${kamer.naam}`}>{kamer.naam}</Link>

      <Link
        className="btn btn-pink"
        role="button"
        to={`/kamer/${kamer.naam}/edit`}
      >
        Edit
      </Link>

      <button onClick={(e) => deleteKamer(e)} value={kamer.naam}>
        delete
      </button>
    </FlexBox>
  );
};

export default KamerCard;
