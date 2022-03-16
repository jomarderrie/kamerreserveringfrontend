import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {deleteKamer, getPaginatedKamers} from "../functions/kamers";

export const KamersContext = React.createContext();

export default function KamerProvider({children}) {
    const [kamers, setKamers] = useState([]);

    const [pageKamerInfo, setPageKamerInfo] = useState({
        pageNo: 0,
        pageSize: 5,
        sortBy: "naam",
        totalPages: 0,
        totalElements: 0,
    })

    let history = useHistory();

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

    const getPaginatedKamersContext = async (currentPage, pageSize, sortBy = "naam") => {
        console.log(pageKamerInfo, "asd")
        await getPaginatedKamers(currentPage, pageSize, sortBy).then((res, err) => {
            setKamers(res.data.content);
            setPageKamerInfo(
                {
                    totalPages: res.data.totalPages,
                    totalElements: res.data.totalElements,
                    pageNo: res.data.currentPage,
                    pageSize: res.data.kamersPerPage
                }
            )
        });

    }

    const filterRooms = (searchKeyWord) => {
        kamers.filter((item) => {

        })
    }

    return (
        <KamersContext.Provider
            value={{kamers, setKamers, deleteKamerOnClick, pageKamerInfo, setPageKamerInfo, getPaginatedKamersContext}}>
            {children}
        </KamersContext.Provider>
    );
}
