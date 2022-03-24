import axios from "axios";
import {logDOM} from "@testing-library/react";

export const getPaginatedKamers = async (currentPage, pageSize, sortBy = "naam") =>
    await axios.get(`http://localhost:8080/kamer/all?pageNo=${currentPage}&pageSize=${pageSize}&sortBy=${sortBy}`, {
        headers: {
            authorization:
                "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
            "Access-Control-Allow-Origin": "*",
        },
    });

export const getSingleKamer = async (kamerNaam) =>
    await axios.get(`http://localhost:8080/kamer/${kamerNaam}`, {
        headers: {
            authorization:
                "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
            "Access-Control-Allow-Origin": "*",
        },
    });

export const maakNieuweKamer = async (naam, sluitTijd, startTijd) => {
    console.log(naam, sluitTijd, startTijd);
    await axios.post(
        "http://localhost:8080/kamer/new",
        {naam, sluit: sluitTijd, start: startTijd},
        {
            headers: {
                authorization:
                    "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
                "Access-Control-Allow-Origin": "*",
            },
        }
    );
};

export const editKamer = async (vorigeNaam, naam, sluitTijd, startTijd) => {
    console.log(vorigeNaam, naam, sluitTijd, startTijd);
    await axios.put(
        `http://localhost:8080/kamer/edit/${vorigeNaam}`,
        {naam, sluit: sluitTijd, start: startTijd},
        {
            headers: {
                authorization:
                    "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
                "Access-Control-Allow-Origin": "*",
            },
        }
    );
};

export const deleteKamer = async (naam) => {
    await axios.delete(`http://localhost:8080/kamer/delete/${naam}`, {
        headers: {
            authorization:
                "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
            "Access-Control-Allow-Origin": "*",
        },
    });
};

export const maakNieuweReservatie = async (naam, start, end) => {
    await axios.post(
        `http://localhost:8080/kamer/${naam}/reserveer`,
        {start, end},
        {
            headers: {
                authorization:
                    "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
                "Access-Control-Allow-Origin": "*",
            },
        }
    );
};

export const getImageFromDb = async (kamerNaam, naamImage) => {
    return await axios
        .get(`http://localhost:8080/images/kamer/${kamerNaam}/${naamImage}`, {
            responseType: "blob",
            headers: {
                authorization:
                    "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
                "Access-Control-Allow-Origin": "*",
            },
        })
        .then((data) => {
            return data;
        });
};

export const getAllKamerByNaamAndGetAllReserverationsOnCertainDay = async (
    kamerNaam,
    datum
) =>
    await axios.get(
        `http://localhost:8080/kamer/${kamerNaam}/reserveringen/${datum}`,
        {
            headers: {
                authorization:
                    "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
                "Access-Control-Allow-Origin": "*",
            },
        }
    );

export const getAllkamersByNaamEnSortables =  async (pageKamerFilters) => {
    return await axios.get(`http://localhost:8080/kamer/${pageKamerFilters.searchKamerString}&alGereserveerde=${pageKamerFilters.alGereserveerde}&eigenReservaties=${pageKamerFilters.eigenReservaties}`)
}