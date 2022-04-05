import React, {useEffect, useState, useContext} from "react";
import {
    getAllKamerByNaamAndGetAllReserverationsOnCertainDay,
    getSingleKamer,
    maakNieuweReservatie,
} from "../../functions/kamers";
import moment from "moment";
import {FlexBox, setRem} from "../../styled/styles";
import KamerImage from "../../images/neudebieb.png";
import {Image} from "../../styled/Image";
import TimeRange from "react-timeline-range-slider";
import {endOfToday, set} from "date-fns";
import {toast} from "react-toastify";
import {isEmpty} from "../../helpers/IsEmpty";
import addMonths from "date-fns/addMonths";
import DatePicker, {ReactDatePicker} from "react-datepicker";
import {getImagesFromDbAndFiles} from "./../../helpers/getImagesFromDb";
import styled from "styled-components";
import {
    StyledButtonLink,
    StyledButtonDelete,
} from "./../../styled/globals/StyledRouterLink";
import Carousel from "../../components/carousel/Carousel";
import {FlexBoxUpDown} from "../../styled/globals/StyledFlexBoxContainer";
import {KamersContext} from "../../context/KamersContext";
import {useHistory} from "react-router-dom";
import TableView from "../../components/kamer/TableView";
import {AuthContext} from "../../context/AuthContext";

export default function SingleKamer({match}) {
    const {naam} = match.params;
    const [loading, setLoading] = useState(true);
    const [kamer, setKamer] = useState({});
    const [errorTimeRange, setTimeRangeError] = useState(null);

    const [error, setError] = useState(null);
    const [tableView, setTableView] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);
    // const [startDate, endDate] = dateRange;
    const [startDate, setStartDate] = useState(null);
    const [resizedImages, setImages] = useState(null);
    const [timeRangeSliderDate, setTimeRangeSliderDate] = useState(new Date());
    const [am, setAm] = React.useState([null, null]);
    const [pm, setPm] = React.useState([null, null]);
    const [limite2, setLimite2] = useState([null, null]);
    const [disabledIntervals2, setDisabledIntervals2] = useState([]);
    const [errorAm, setErrorAm] = React.useState(false);
    const [alReservatie, setAlReservatie] = React.useState(false);
    const [reservations, setReservations] = React.useState([]);
    const [reservationSending, setReservationSending] = useState(false);
    const [startEindTijd, setStartEindTijd] = useState([]);

    const {deleteKamerOnClick} = useContext(KamersContext);
    const {
        user, setUser, token, setToken
    } = useContext(AuthContext);


    useEffect(() => {
        setLoading(true);
        getSingleKamer(naam)
            .then((res, err) => {
                if (err) {
                    setLoading(false);
                    setError(err);
                } else {
                    setKamer(res.data);
                    console.log(res.data, "data123");
                    let startDate = new Date(res.data.startTijd);
                    // console.log(res.data);
                    let eindDate = new Date(res.data.sluitTijd);

                    setDateRange([startDate, eindDate]);
                    console.log(startDate, eindDate, "plek123")
                    setStartEindTijd([startDate.getHours(), eindDate.getHours()]);
                    setLimite2([
                        getDate(startDate.getHours()),
                        getDate(eindDate.getHours()),
                    ]);
                    getImagesFromDbAndFiles(res.data.naam, res.data.attachments, false)
                        .then((res) => {
                            setImages(res[0]);
                            console.log(res, "kek");
                            setLoading(false);
                        })
                        .catch((k) => {
                            if (!k.response?.data?.message) {
                                toast.error(k);
                            } else {
                                toast.error(k.response.data.message);
                            }
                            setLoading(false);
                            return Promise.reject(err);
                        });
                }
            })
            .catch((k) => {
                if (!k.response?.data?.message) {
                    toast.error(k);
                } else {
                    toast.error(k.response.data.message);
                }

                setLoading(false);
                setKamer({});
                toast.error(k.response.data.message);
                return Promise.reject(k);
            });
    }, []);

    const TimeRangeSlider = () => {
        if (disabledIntervals2 !== []) {
            return (
                <TimeRange
                    step={3600000}
                    error={errorAm}
                    ticksNumber={36}
                    selectedInterval={am}
                    onChangeCallback={setAm}
                    timelineInterval={limite2}
                    onUpdateCallback={(value) => setErrorAm(value.error)}
                    disabledIntervals={disabledIntervals2}
                />
            );
        }
    };

    const getDate = (hour, date) => {
        if (date !== undefined) {
            return set(date, {
                seconds: 0,
                hours: date.getHours(),
                milliseconds: 0,
                minutes: 0,
            });
        } else {
            return set(timeRangeSliderDate, {
                seconds: 0,
                hours: hour,
                milliseconds: 0,
                minutes: 0,
            });
        }
    };

    useEffect(() => {
        console.log("test");
        if (!isEmpty(kamer)) {
            if (!reservationSending) {
                if (!loading) {
                 
                    setReservationSending(true);
                    getAllKamerByNaamAndGetAllReserverationsOnCertainDay(
                        kamer.naam,
                        timeRangeSliderDate.toLocaleDateString().split("/").join("-")
                    )
                        .then((res, err) => {
                            if (err) {
                                console.log(err);
                                setReservationSending(false);
                            } else {
                                console.log(res.data, "reservations");
                                setReservations(res.data);
                                setLimite2([
                                    getDate(startEindTijd[0]),
                                    getDate(startEindTijd[1]),
                                ]);
                                calculateDisabledIntervalsAndOpenInterval(res.data);
                                setReservationSending(false);
                                // setLimite2([getDate(am[0].getHours()),
                                // getDate(am[1].getHours())])
                            }
                        })
                        .catch((err) => {
                            console.log(err, "err");
                            setReservationSending(false);
                            toast.error(err.response.data.message);
                            return Promise.reject(err);
                        });
                }
            }
        }
    }, [kamer, timeRangeSliderDate, reservations, loading]);

    const calculateDisabledIntervalsAndOpenInterval = (res) => {
        let reserveringListObj = [];
        console.log(res, "res");
        if (res !== null) {
            if (res !== 0) {
                res.map((item, index) => {
                    reserveringListObj.push({
                        start: moment(getDate(new Date(item.start).getHours())).toDate(),
                        end: moment(getDate(new Date(item.end).getHours())).toDate(),
                    });
                });
            }
        }
        // kamer.startTijd;

        if (!checkIfReservationIsFull(reserveringListObj)) {
            generateOpenInterval(res);
        } else {
            setReservations(true);
            setAm([null, null]);
        }

        console.log(reserveringListObj, "kek")
        setDisabledIntervals2(reserveringListObj);
    };

    const checkIfReservationIsFull = (reserveringList) => {
        let totalHours = 0;
        let timeLineInterval = limite2[1].getHours() - limite2[0].getHours();
        if (reserveringList.length !== 0) {
            reserveringList.map((item) => {
                totalHours += item.end.getHours() - item.start.getHours();
            });
        }
        console.log(totalHours, "total");
        return totalHours >= timeLineInterval;
    };

    const generateOpenInterval = (reserveringListObj) => {
        let startTijd = getDate(startEindTijd[0]);
        let endTijd = getDate(startEindTijd[1]);
        console.log(startTijd, endTijd, "kekdeez")
        const interval = 60 * 60000;
        let alReservatieInterval = false;
        while (
            startTijd.getTime() <= endTijd.getTime() - interval &&
            !alReservatieInterval
            ) {
            alReservatieInterval = getOverLap(
                new Date(startTijd.getTime()),
                new Date(startTijd.getTime() + interval),
                reserveringListObj
            );
            startTijd = new Date(startTijd.getTime() + interval);
            if (
                !(startTijd.getTime() <= endTijd.getTime() - interval) &&
                !alReservatieInterval
            ) {
                setAm(null, null);
            }
        }
    };

    const getOverLap = (startDate, eindDate, reserveringListObj) => {
        console.log(reserveringListObj, "rep");
        for (let index = 0; index < reserveringListObj.length; index++) {
            let startReserveringDate = new Date(reserveringListObj[index].start);
            let eindReserveringDate = new Date(reserveringListObj[index].end);
            if (
                startDate.getTime() < eindReserveringDate.getTime() &&
                eindDate.getTime() > startReserveringDate.getTime()
            ) {
                return false;
            }
        }
        setAm([startDate, eindDate]);
        setErrorAm(false);
        setAlReservatie(true);
        return true;
    };

    const showTime = () => {
        let results = [];
        let startTijd = new Date(kamer.startTijd);
        let endTijd = new Date(kamer.sluitTijd);
        const interval = 60 * 60000; //1 uur

        // console.log(  new Date(startTijd.getTime()));
        // while (startTijd.getTime() <= endTijd.getTime() - interval) {

        //     console.log(new Date(startTijd.getTime()).toLocaleTimeString())
        //     results.push({ "startTijd": new Date(startTijd.getTime()).toLocaleTimeString(), "eindTijd": new Date(startTijd.getTime() + interval).toLocaleTimeString() })
        //     startTijd = new Date(startTijd.getTime() + interval);
        // }

        return results.map((item, index) => {
            return (
                <div key={index}>
                    <p>
                        {item.startTijd} - {item.eindTijd}
                    </p>
                </div>
            );
        });
    };

    const handleSubmit = (e, am) => {
        e.preventDefault();
        if (!loading && !isEmpty(kamer)) {
            console.log("getting handle submitted")
            if (!errorAm) {
                let startReservationDate = set(timeRangeSliderDate, {
                    seconds: 0,
                    hours: am[0].getHours() + 1,
                    milliseconds: 0,
                    minutes: 0,
                });
                // getDate(am[0].getHours() + 1);
                let eindReservationDate = set(timeRangeSliderDate, {
                    seconds: 0,
                    hours: am[1].getHours() + 1,
                    milliseconds: 0,
                    minutes: 0,
                });
                console.log(kamer.naam)
                maakNieuweReservatie(
                    kamer.naam,
                    startReservationDate,
                    eindReservationDate
                )
                    .then((res, err) => {
                        if (err) {
                            console.log(err, "err");
                        } else {
                            setReservations((prev) => {
                                prev.push(startReservationDate, eindReservationDate);
                            });
                            toast.success("Succesvol nieuwe reservering aangemaakt.");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error(error.response.data.message);
                        return Promise.reject(error);
                    });
            }
        }
    };
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };

    const setStartDateLimit = (startDate) => {
        let vandaag = new Date();
        let kamerStartTijd = dateRange[0];
        if (kamerStartTijd.getTime() > vandaag.getTime()) {
            return new Date();
        } else {
            return kamerStartTijd;
        }
        // if(vandaag.)
    };

    const sameDay = (d1, d2) => {
        return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
        );
    };

    const kamerLoaded = (kamer) => {
        return (
            <SingleKamerStyled width="100vw">
                {user.role === "admin" && <FlexBoxUpDown
                    x="flex-end"
                    width="100%"
                    upDown="10"
                    leftRight="24"
                    className="kamerAdmin-btn"
                >
                    <StyledButtonLink

                        to2={`/kamers/${kamer.naam}/edit`}
                        className={"btn-pink"}
                        text={"Edit"}
                        icon={"fa-edit"}
                    />

                    <StyledButtonDelete
                        value2={kamer.naam}
                        text="Delete"
                        icon={"fa-trash"}
                        naam={kamer.naam}
                        action={deleteKamerOnClick}
                    />
                </FlexBoxUpDown> }

                <FlexBoxUpDown z="row" width="100vw" leftRight="24">


                    <FlexBox z="row" width="40vw">
                        <FlexBox z="column" width="40vw">
                            <div>
                                <h1 className="kamer-title">{kamer.naam}</h1>
                            </div>
                            <Carousel images={resizedImages}/>
                        </FlexBox>
                    </FlexBox>


                    <FlexBox z="column" width="60vw">
                        <div>De ruimte is te reserveren vanaf</div>
                        <FlexBox style={{paddingLeft: "3px"}}>
                            {!isEmpty(kamer.startTijd) ? (
                                new Date(kamer.startTijd).toLocaleDateString("nl-NL")
                            ) : (
                                <div>...Loading</div>
                            )}
                            <span style={{padding: "5px"}}>tot</span>
                            {!isEmpty(kamer.sluitTijd) ? (
                                new Date(kamer.sluitTijd).toLocaleDateString("nl-NL")
                            ) : (
                                <div>...Loading</div>
                            )}
                            <br></br>
                            {/* {kamer.startTijd.toLocaleTimeString()} tot {kamer.sluitTijd} */}
                        </FlexBox>
                        <FlexBox>
                            {" "}
                            &nbsp; en openingstijden van &nbsp;
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
                        <FlexBox z="row">
                            <div>
                                <h3>Openings tijden</h3>
                                {showTime()}
                                Gekozen datum: {timeRangeSliderDate.toDateString()}
                            </div>
                            <div className={"switch-table-btn"}>
                                <button onClick={() => {
                                    setTableView(prev => {
                                        return !prev
                                    })
                                }}>
                                    Switch to table
                                </button>
                            </div>
                        </FlexBox>

                        <form onSubmit={(e) => handleSubmit(e, am)}>
                            <FlexBox x={"space-between"}>
                                <span className={`fa-arrow-right fa-2x button-icon`}/>
                                <div className="datePicker">
                                    <DatePicker
                                        minDate={setStartDateLimit(kamer.startDate)}
                                        maxDate={dateRange[1]}
                                        dateFormat="dd/MM/yyyy"
                                        selected={timeRangeSliderDate}
                                        onChange={(date) => setTimeRangeSliderDate(date)}
                                    />
                                </div>
                                <span className={`fa-arrow-left fa-2x button-icon`}/>
                            </FlexBox>
                            <button
                                type="submit"
                                disabled={reservationSending || loading}
                            >
                                submit reservatie
                            </button>
                        </form>
                            {(tableView) ? <TimeRangeSlider/> : <TableView reservaties={reservations} tableView={tableView}/>}

                    </FlexBox>
                </FlexBoxUpDown>

            </SingleKamerStyled>
        );
    };

    return (
        <FlexBox x={"start"}>
            {!isEmpty(kamer) && !loading ? (
                kamerLoaded(kamer)
            ) : loading ? (
                <div>loading...</div>
            ) : (
                <div>
                    <h2>Error kamer niet gevonden</h2>
                </div>
            )}
        </FlexBox>
    );
}

const SingleKamerStyled = styled(FlexBox)`
  display: flex;
  width: 100%;
  flex-direction: column;

  .kamerAdmin-btn button {
    margin: 10px;
  }

  .kamer-title {
    padding-left: 60px;
    font-size: 48px;
  }

  .timeRangeSlider {
    padding: 0px;
    width: 50vw;
    z-index: 1;
  }

  .react_time_range__time_range_container {
    padding: 5px 0;
    padding-top: 30px;
  }

  .react-datepicker-popper {
    z-index: 100;
  }
`;
