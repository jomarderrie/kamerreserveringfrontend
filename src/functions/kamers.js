import axios from "axios";

export const getPaginatedKamers = async (currentPage, pageSize, sortBy = "naam", token) =>
    await axios.get(`http://localhost:8080/kamer/all?pageNo=${currentPage}&pageSize=${pageSize}&sortBy=${sortBy}`, {
        headers: {
            authorization:
                "Basic " + token,
            "Access-Control-Allow-Origin": "*",
        },
    });

export const getSingleKamer = async (kamerNaam, token) =>
    await axios.get(`http://localhost:8080/kamer/${kamerNaam}`, {
        headers: {
            authorization:
                "Basic " + token,
            "Access-Control-Allow-Origin": "*",
        },
    });

export const maakNieuweKamer = async (naam, sluitTijd, startTijd, token) => {
    console.log(naam, sluitTijd, startTijd);
    await axios.post(
        "http://localhost:8080/kamer/new",
        {naam, sluit: sluitTijd, start: startTijd},
        {
            headers: {
                authorization:
                    "Basic " + token,
                "Access-Control-Allow-Origin": "*",
            },
        }
    );
};

export const editKamer = async (vorigeNaam, naam, sluitTijd, startTijd, token) => {
    console.log(vorigeNaam, naam, sluitTijd, startTijd);
    await axios.put(
        `http://localhost:8080/kamer/edit/${vorigeNaam}`,
        {naam, sluit: sluitTijd, start: startTijd},
        {
            headers: {
                authorization:
                    "Basic " + token,
                "Access-Control-Allow-Origin": "*",
            },
        }
    );
};

export const deleteKamer = async (naam, token) => {
    await axios.delete(`http://localhost:8080/kamer/delete/${naam}`, {
        headers: {
            authorization:
                "Basic " + token,
            "Access-Control-Allow-Origin": "*",
        },
    });
};

export const maakNieuweReservatie = async (naam, start, end, token) => {
    await axios.post(
        `http://localhost:8080/kamer/${naam}/reserveer`,
        {start, end},
        {
            headers: {
                authorization:
                    "Basic " + token,
                "Access-Control-Allow-Origin": "*",
            },
        }
    );
};

export const getImageFromDb = async (kamerNaam, naamImage, token) => {
    return await axios
        .get(`http://localhost:8080/images/kamer/${kamerNaam}/${naamImage}`, {
            responseType: "blob",
            headers: {
                authorization:
                    "Basic " + token,
                "Access-Control-Allow-Origin": "*",
            },
        })
        .then((data) => {
            return data;
        });
};

export const getAllKamerByNaamAndGetAllReserverationsOnCertainDay = async (
    kamerNaam,
    datum, token
) =>
    await axios.get(
        `http://localhost:8080/kamer/${kamerNaam}/reserveringen/${datum}`,
        {
            headers: {
                authorization:
                    "Basic " + token,
                "Access-Control-Allow-Origin": "*",
            },
        }
    );

export const getAllkamersByNaamEnSortables = async (pageKamerFilters, token) => {
    return await axios.get(`http://localhost:8080/kamer/searched?searched=${pageKamerFilters.searchKamerString}&alGereserveerde=${pageKamerFilters.alGereserveerde}&eigenReservaties=${pageKamerFilters.eigenReservaties}&pageNo=${pageKamerFilters.pageNo}&pageSize=${pageKamerFilters.pageSize}`, {
        headers: {
            authorization:
                "Basic " + token,
            "Access-Control-Allow-Origin": "*",
        },
    })
}