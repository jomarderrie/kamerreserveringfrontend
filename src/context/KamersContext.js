import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {deleteKamer, getAllkamersByNaamEnSortables, getPaginatedKamers} from "../functions/kamers";

export const KamersContext = React.createContext();

export default function KamerProvider({children}) {
    let history = useHistory();

    const [kamers, setKamers] = useState([]);
    const [kamerFound, setKamerFound] = useState(true)
    const [pageKamerInfo, setPageKamerInfo] = useState({
        pageNo: 0,
        pageSize: 5,
        sortBy: "naam",
        content: [],
        totalPages: 0,
        totalElements: 0,
    })

    const [pageKamerFilters, setPageKamerFilters] = useState({
        eigenReservaties: false,
        alGereserveerde: false,
        pageNo: 0,
        pageSize: 5,
    })



    const deleteKamerOnClick = async (naam) => {
        // console.log(e.target);
        console.log(naam, "oekoek");
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
                    history.push("/kamers")

                    toast.success(`Delete kamer met naam ${naam}`);
                }
            })
            .catch((k) => {
                if (!k.response?.data?.message) {
                    toast.error(k);
                } else {
                    toast.error(k.response.data.message);
                }

                return Promise.reject(k);
            });
    };

    const lastPage = () => {
        return parseInt(pageKamerInfo.totalElements + 1 / pageKamerInfo.pageSize)
    }

    const getPaginatedKamersContext = async (currentPage, pageSize, sortBy = "naam", token) => {
        console.log(token, "token123")
        await getPaginatedKamers(currentPage, pageSize, sortBy, token).then((res, err) => {
            setKamers(res.data.content);
            console.log(res.data.content, "test123")
            setPageKamerInfo(
                {
                    totalPages: res.data.totalPages,
                    totalElements: res.data.totalElements,
                    pageNo: res.data.number,
                    pageSize: res.data.size,
                    content: res.data.content
                }
            )
        });
    }

    const getPaginatedKamersSortables= async (pageKamerInfo) =>{
        await getAllkamersByNaamEnSortables(pageKamerInfo).then((res, err) => {
            setKamers(res.data.content);
            console.log(res.data.content, "test123")
            setPageKamerInfo(
                {
                    totalPages: res.data.totalPages,
                    totalElements: res.data.totalElements,
                    pageNo: res.data.number,
                    pageSize: res.data.size,
                    content: res.data.content
                }
            )
        });
    }

    const filterRooms = (stringToSearch) => {
        console.log(stringToSearch.length, 't')
        if (stringToSearch.length !== 0) {
            let searchedKamers = pageKamerInfo.content.filter((item) => {
                return item.naam.toLowerCase()
                    .indexOf(stringToSearch) !== -1;
            })
            console.log(searchedKamers, "kek123")
            setKamers(searchedKamers);
            if (searchedKamers.length === 0){
                setKamerFound(false)
            }else{
                setKamerFound(true)
            }
        }else{
            console.log("getting hit", pageKamerInfo.content)
            setKamers(pageKamerInfo.content);
            setKamerFound(true)
        }
    }

    return (
        <KamersContext.Provider
            value={{
                kamers,
                setKamers,
                deleteKamerOnClick,
                pageKamerInfo,
                setPageKamerInfo,
                getPaginatedKamersContext,
                lastPage,
                filterRooms,
                pageKamerFilters,
                setPageKamerFilters,
                kamerFound,
                setKamerFound,
                getPaginatedKamersSortables,

            }}>
            {children}
        </KamersContext.Provider>
    );
}
