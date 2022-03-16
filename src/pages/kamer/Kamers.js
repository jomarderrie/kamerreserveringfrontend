import React, {Component, useContext, useEffect, useState} from "react";
import {
    deleteKamerMetFetch,
    getPaginatedKamers,
    getImageFromDb,
} from "../../functions/kamers";
import {set} from "react-hook-form";
import {FlexBox, setUpDownPadding} from "../../styled/styles";
import KamerCard from "../../components/kamer/KamerCard";
import {Link, useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {deleteKamer} from "../../functions/kamers";
import {Image} from "../../styled/Image";
import Input from "../../styled/globals/Input";
import InputWithImage from "../../styled/globals/Input";
import {FlexBoxUpDown, GridImages} from "./../../styled/globals/StyledFlexBoxContainer";
import {ButtonLink, StyledButtonLink, StyledRouterLink} from "./../../styled/globals/StyledRouterLink";
import SideBar from "../../components/navbar/SideBar";
import {deleteKamerOnClick} from "../../helpers/kamerDelete"
import {KamersContext} from "../../context/KamersContext";
import * as url from "url";

function Kamers(props) {
    const {kamers, setKamers, pageKamerInfo, setPageKamerInfo, getPaginatedKamersContext} = useContext(KamersContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    }, [props.location.search])


    // const getPageParams = () =>{
    //
    //
    //     if (urlSearchParams.get("sortBy")) {
    //
    //         // setPageKamerInfo(prevKamerInfo => {...pageKamerInfo, pageNo:urlSearchParams.get("pageNo"), pageSize:urlSearchParams.get("pageSize"), sortBy: urlSearchParams.get("sortBy")})
    //         return "a"
    //     } else {
    //         let pageNo = urlSearchParams.get("pageNo");
    //         console.log(pageNo.toString(), "ke123")
    //         setPageKamerInfo({...pageKamerInfo, ['pageNo']:pageNo.toString()})
    //         console.log(pageKamerInfo, "ge3")
    //     }
    // }

    useEffect(() => {
        setLoading(true);
        if (props.location.search){
            const urlSearchParams = new URLSearchParams(props.location.search)
            if (urlSearchParams.get("sortBy")){
                getPaginatedKamersContext(urlSearchParams.get("pageNo"), urlSearchParams.get("pageSize"), urlSearchParams.get("sortBy")).then(() => {
                    setLoading(false)
                })
            }else{
                getPaginatedKamersContext(urlSearchParams.get("pageNo"), urlSearchParams.get("pageSize")).then(() => {
                    setLoading(false)
                })
            }
        }else{
            console.log("no search")
            getPaginatedKamersContext(pageKamerInfo.pageNo, pageKamerInfo.pageSize, pageKamerInfo.sortBy).then(() => {
                setLoading(false)
            })
        }
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
            {kamers.length<=0?<div>
                No kamers found
            </div>:  <GridImages width="90vw" display={"grid"} gridSize="250px">
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
            </GridImages>}

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
