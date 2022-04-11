import React, { Component, useContext, useState, useEffect } from "react";
import { FlexBox, setUpDownPadding } from "../../styled/styles";
import DatePicker from "react-datepicker";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Image } from "../../styled/Image";
import { getImageFromDb } from "../../functions/kamers";
import axios from "axios";
import imageNoFound from "../../images/image_not_found.png";
import { isEmpty } from "./../../helpers/IsEmpty";
import {
  StyledButtonLink,
  ButtonWithIcon,
  ButtonLink,
  StyledButtonDelete,
} from "./../../styled/globals/StyledRouterLink";
import {
  ContainerKamerInfo,
   FlexBoxUpDown,
} from "./../../styled/globals/StyledFlexBoxContainer";
import { useHistory } from "react-router-dom";
import { KamersContext } from "../../context/KamersContext";

const KamerCard = ({ kamer, image, key, admin, token }) => {

  const { deleteKamerOnClick } = useContext(KamersContext);
  const [kamerImages, setKamerImages] = useState("");
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    console.log(kamer);
    console.log(admin, "admin123")
    setLoading(true);
    if (kamer.attachments.length !== 0) {
      getImageFromDb(kamer.naam, kamer.attachments[0].name, token)
        .then((k) => {
          setKamerImages(URL.createObjectURL(k.data));
          setLoading(false);
        })
        .catch((err) => {
          setKamerImages("");
          setLoading(false);
          return Promise.reject(err);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleOnClickTest = (e, naam) => {
    console.log(e.target.innerText) 
    if (!(e.target.innerText === "Edit" || e.target.innerText === "Delete") || !(e.target.outerText === "Edit" || e.target.outerText === "Delete")) {
      history.push(`/kamer/${naam}`);
    }
  };

  return (
    <FlexBox
      z={"column"}
      width={"100%"}
      key={key}
      style={{ cursor: "pointer" }}
    >
      <div style={{ cursor: "pointer", width: "100%" }}>
        {loading ? (
          <div>...loading...</div>
        ) : (
          <img
            onClick={(e) => handleOnClickTest(e, kamer.naam)}
            src={kamerImages === "" ? imageNoFound : kamerImages}
          />
        )}
        <ContainerKamerInfo z="column"  onClick={(e) => handleOnClickTest(e, kamer.naam)} key={key}>
          <h2 onClick={(e) => handleOnClickTest(e, kamer.naam)}>
            {kamer.naam}
          </h2>
          <FlexBox onClick={(e) => handleOnClickTest(e, kamer.naam)}>
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
          {admin &&  < FlexBoxUpDown x="space-evenly" width="100%" upDown="6">
            <StyledButtonLink
                value2="hey"
                to2={`/kamer/${kamer.naam}/edit`}
                className={"btn btn-pink"}
                text={"Edit"}
                icon={"fa-edit"}
            />
            <StyledButtonDelete
                value2={kamer.naam}
                action={deleteKamerOnClick}
                text="Delete"
                icon={"fa-trash"}
                naam={kamer.naam}
                token={token}
            />
          </ FlexBoxUpDown>}

        </ContainerKamerInfo>
      </div>
    </FlexBox>
  );
};

export default KamerCard;
