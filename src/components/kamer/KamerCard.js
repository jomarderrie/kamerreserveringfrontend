import React, { Component, useContext, useState, useEffect } from "react";
import { FlexBox } from "../../styled/styles";
import DatePicker from "react-datepicker";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Image } from "../../styled/Image";
import { getImageFromDb } from "../../functions/kamers";
import axios from "axios";
import imageNoFound from "../../images/image_not_found.png";
import { isEmpty } from "./../../helpers/IsEmpty";
import { StyledButtonLink, ButtonWithIcon, ButtonLink } from './../../styled/globals/StyledRouterLink';
const KamerCard = ({ kamer, deleteKamer, image }) => {
  const { user } = useContext(AuthContext);
  const [kamerImages, setKamerImages] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(kamer);
    setLoading(true);
    if (kamer.attachments.length !== 0) {
      console.log(kamer.attachments, "ok");
      // console.log(kamer.attachments[0].name, "k1");
      getImageFromDb(kamer.attachments[0].name).then((k) => {
        setKamerImages(URL.createObjectURL(k.data));
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <FlexBox z={"column"}>
      {loading ? (
        <div>...loading...</div>
      ) : (
        <img src={kamerImages === "" ? imageNoFound : kamerImages} />
      )}

      <Link to={`/kamer/${kamer.naam}`}>{kamer.naam}</Link>
      <FlexBox style={{ paddingLeft: "3px" }}>
        {!isEmpty(kamer.startTijd) ? (
          new Date(kamer.startTijd).toLocaleDateString("nl-NL")
        ) : (
          <div>...Loading</div>
        )}
        <span style={{ padding: "5px" }}>tot</span>
        {!isEmpty(kamer.sluitTijd) ? (
          new Date(kamer.sluitTijd).toLocaleDateString("nl-NL")
        ) : (
          <div>...Loading</div>
        )}
        <br></br>
        {/* {kamer.startTijd.toLocaleTimeString()} tot {kamer.sluitTijd} */}
      </FlexBox>
      <FlexBox>
        {!isEmpty(kamer.startTijd) ? (
          new Date(kamer.startTijd).toLocaleTimeString("nl-NL")
        ) : (
          <div>...Loading</div>
        )}
        &nbsp; tot &nbsp;
        {!isEmpty(kamer.sluitTijd) ? (
          new Date(kamer.sluitTijd).toLocaleTimeString("nl-NL")
        ) : (
          <div>...Loading</div>
        )}
      </FlexBox>
      <FlexBox x="space-evenly" width="100%">
      <ButtonLink    to={`/kamer/${kamer.naam}/edit`} className={"btn btn-pink"} text={"edit"} icon={"fa-edit"}/>
        <ButtonWithIcon value={kamer.naam} onClick={(e) => deleteKamer(e)} text="Delete" icon={"fa-trash"}/>  
      
      </FlexBox>
    </FlexBox>
  );
};

export default KamerCard;

