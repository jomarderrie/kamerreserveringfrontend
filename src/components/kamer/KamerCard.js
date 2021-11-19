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
import { StyledButtonLink, ButtonWithIcon, ButtonLink } from './../../styled/globals/StyledRouterLink';
import { ContainerKamerInfo, FlexBoxUpDown } from './../../styled/globals/StyledFlexBoxContainer';
import { useHistory } from "react-router-dom";


const KamerCard = ({ kamer, deleteKamer, image }) => {
  const { user } = useContext(AuthContext);
  const [kamerImages, setKamerImages] = useState("");
  const [loading, setLoading] = useState(true);
  let history = useHistory();

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

  const handleOnClickTest = (e,naam) => {
    
    
      history.push(`/kamer/${naam}`)
    
  }

  return (
    <FlexBox z={"column"} style={{cursor:"pointer"}}>
      {loading ? (
        <div>...loading...</div>
      ) : (
        <img onClick={(e) =>handleOnClickTest(e,kamer.naam) }src={kamerImages === "" ? imageNoFound : kamerImages} />
      )}
<ContainerKamerInfo z = "column" >
      <h2 onClick={(e) =>handleOnClickTest(e,kamer.naam) }>{kamer.naam}</h2>
      <FlexBox style={{ paddingLeft: "3px" }} onClick={(e) =>handleOnClickTest(e,kamer.naam) }>
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
      <FlexBoxUpDown x="space-evenly" width="100%" upDown="6">
      <ButtonLink  value2="hey"  to2={`/kamer/${kamer.naam}/edit`} className={"btn btn-pink"} text={"Edit"} 
     
       icon={"fa-edit"}/>
        <ButtonWithIcon value2={kamer.naam} action={ deleteKamer} text="Delete" icon={"fa-trash"}
          naam={kamer.naam}
        />  
      
      </FlexBoxUpDown>
</ContainerKamerInfo>
    </FlexBox>
  );
};

export default KamerCard;

