import React, { Component, useContext, useEffect, useState } from "react";
import {
  deleteKamerMetFetch,
  getPaginatedKamers,
  getImageFromDb,
} from "../../functions/kamers";
import { set } from "react-hook-form";
import { FlexBox, setUpDownPadding } from "../../styled/styles";
import KamerCard from "../../components/kamer/KamerCard";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteKamer } from "../../functions/kamers";
import { Image } from "../../styled/Image";
import Input from "../../styled/globals/Input";
import InputWithImage from "../../styled/globals/Input";
import { FlexBoxUpDown, GridImages } from "./../../styled/globals/StyledFlexBoxContainer";
import { ButtonLink, StyledButtonLink, StyledRouterLink } from "./../../styled/globals/StyledRouterLink";
import SideBar from "../../components/navbar/SideBar";
import {deleteKamerOnClick} from "../../helpers/kamerDelete"
import { KamersContext } from "../../context/KamersContext";
import * as url from "url";
function Kamers(props) {
  const {kamers, setKamers, pageKamerInfo, setPageKamerInfo, getPaginatedKamersContext}= useContext(KamersContext);
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    const urlSearchParams = new URLSearchParams(props.location.search)
    console.log(urlSearchParams.get("pageNo"), "ke")
    urlSearchParams.get("pageSize")
    for (const [key, value] of urlSearchParams.entries()) {
      console.log(key, value, "ts1")
    }
  },[props.location.search])

  useEffect(() => {
    setLoading(true);
    getPaginatedKamersContext().then(() =>{
      setLoading(false)
    })

  }, []);

  const deleteKamerOnClick = async (naam, setKamers) => {
    // console.log(e.target);
  await deleteKamer(naam)
    .then((res, err) => {
      if (err) {
        toast.error("Error met het toevoegen van een kamer");
      } else {
        setKamers((prevKamer) => {
          return prevKamer.filter((kamer) => {
            return kamer.naam !== naam;
          });
        });
        toast.success(`Delete kamer met naam ${naam}`);
      }
    })
    .catch((k) => {
      toast.error(k.response.data.message);

      return Promise.reject(k);
    });
};




  return (
    <div>
      <FlexBoxUpDown x="space-between" upDown="10" leftRight="15">
        <SideBar/>
     

        <div>
          <StyledButtonLink text="Maak nieuwe kamer" to2={"/kamer/new"} icon={"fa-plus"}/>

          {/* <StyledRouterLink
            className="btn btn-pink"
            role="button"
            to={`/kamer/new`}
            type="button"
          >
            Maak nieuwe kamer
          </StyledRouterLink> */}
        </div>
      </FlexBoxUpDown>

      <GridImages width="90vw" display={"grid"} gridSize="250px">
        {kamers.map((kamer, key) => {
          return (
              <KamerCard
                kamer={kamer}
                setKamers={setKamers}
                deleteKamer={deleteKamerOnClick}
                image={kamer.attachment}
                key={key}
              />
         
          );
        })}
        {/* {() => getImageFromDb()} */}
      </GridImages>
      <div>
        <button type="button"> 
          first
        </button>
        <button>
          Prev
        </button>
        <button disabled={true}>
        {pageKamerInfo.currentPage}
        </button>
        <button>
          Next
        </button>

        <button>
          last
        </button>
        
      </div>
      <div>
        Showing Page {pageKamerInfo.currentPage} of {pageKamerInfo.kamersPerPage}
      </div>
    </div>
  );
}

export default Kamers;
