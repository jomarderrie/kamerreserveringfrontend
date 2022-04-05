import React, {Component, useContext, useEffect, useState} from "react";

import KamerCard from "../../components/kamer/KamerCard";
import {toast} from "react-toastify";
import {deleteKamer} from "../../functions/kamers";

import {
    FlexBoxUpDown,
    GridImages,
} from "./../../styled/globals/StyledFlexBoxContainer";


import SideBar from "../../components/navbar/SideBar";

import {KamersContext} from "../../context/KamersContext";

import {AuthContext} from "../../context/AuthContext";

function Kamers(props) {
    const {
        kamers,
        setKamers,
        pageKamerInfo,
        setPageKamerInfo,
        getPaginatedKamersContext,
        kamerFound,
        setKamerFound
    } = useContext(KamersContext);
    const {user, token} = useContext(AuthContext);

    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [propsLoadingState, setPropsLoading] = useState(true);

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
        if (user.role === "admin") {
            setAdmin(true);
        }
    }, [user])

    useEffect(() => {
        setPropsLoading(false);
    }, [pageKamerInfo]);

    useEffect(() => {
        console.log(token, "asd123");
        if (props.location.search) {
            const urlSearchParams = new URLSearchParams(props.location.search);

            if (urlSearchParams.get("sortBy")) {
                getPaginatedKamersContext(
                    urlSearchParams.get("pageNo"),
                    urlSearchParams.get("pageSize"),
                    urlSearchParams.get("sortBy"), token
                ).then(() => {
                    setLoading(false);
                });
            } else {
                getPaginatedKamersContext(
                    urlSearchParams.get("pageNo"),
                    urlSearchParams.get("pageSize"), token
                ).then(() => {
                    setLoading(false);
                });
            }
        } else {
            console.log("no search");
            getPaginatedKamersContext(
                pageKamerInfo.pageNo,
                pageKamerInfo.pageSize,
                pageKamerInfo.sortBy,
                token
            ).then(() => {
                setLoading(false);
            });
        }
    }, [token]);

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

    const nextPage = (event) => {
        event.preventDefault();
        if (pageKamerInfo.pageNo + 1 < pageKamerInfo.totalPages) {
            getPaginatedKamersContext(
                Math.min(pageKamerInfo.totalPages, pageKamerInfo.pageNo + 1),
                pageKamerInfo.pageSize,
                pageKamerInfo.sortBy,
                token
            ).then(() => {
                setLoading(false);
            });
        }
    };

    const handlePrevious = (event) => {
        event.preventDefault();
        if (!(pageKamerInfo.pageNo - 1 < 0)) {
            getPaginatedKamersContext(
                Math.max(0, pageKamerInfo.pageNo - 1),
                pageKamerInfo.pageSize,
                pageKamerInfo.sortBy,
                token
            ).then(() => {
                setLoading(false);
            });
        }
    };
    // <div>
    //             <StyledButtonLink
    //               text="Maak nieuwe kamer"
    //               to2={"/kamer/new"}
    //               icon={"fa-plus"}
    //             />
    //           </div>
    return loading === true || propsLoadingState === true ? (
        <div>Loading...</div>
    ) : (
        <FlexBoxUpDown z="row" width="100%" upDown="10" y="start">
            <div>
                <SideBar/>
            </div>
            <FlexBoxUpDown width="85%" z="column">
                <FlexBoxUpDown z="column">
                    {kamers.length <= 0 || !kamerFound ? (
                        <div>No kamers found</div>
                    ) : (
                        <GridImages width="70vw" display={"grid"} gridSize="500px">
                            {kamers.map((kamer, key) => {
                                return (
                                    <KamerCard
                                        kamer={kamer}
                                        setKamers={setKamers}
                                        deleteKamer={deleteKamerOnClick}
                                        image={kamer.attachment}
                                        admin={admin}
                                        key={key}
                                    />
                                );
                            })}
                        </GridImages>
                    )}
                    <FlexBoxUpDown z="column" upDown="10">
                        <div>
                            <button type="button">first</button>
                            <button onClick={(e) => handlePrevious(e)}>Prev</button>
                            <button onClick={(e) => nextPage(e)}>Next</button>
                            <button>last</button>
                        </div>
                        <div>
                            Showing Page {pageKamerInfo.pageNo + 1} of{" "}
                            {pageKamerInfo.totalPages}
                        </div>
                    </FlexBoxUpDown>
                </FlexBoxUpDown>
            </FlexBoxUpDown>
        </FlexBoxUpDown>
    );
}


export default Kamers;
