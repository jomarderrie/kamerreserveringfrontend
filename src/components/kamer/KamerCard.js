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
    setLoading(true);
    getImageFromDb("Monkey_chathead.png").then((k) =>{
        setKamerImages(URL.createObjectURL(k.data));
        setLoading(false);
    })
  }, []);

  return (
    <FlexBox z={"column"}>
      {loading ? <div>...loading...</div> : <img src={kamerImages}/>}
      
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
