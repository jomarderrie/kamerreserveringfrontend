import React, { useEffect, useState } from "react";
import {
  getAllKamerByNaamAndGetAllReserverationsOnCertainDay,
  getSingleKamer,
  maakNieuweReservatie,
} from "../../functions/kamers";
import moment from "moment";
import { FlexBox, setRem } from "../../styled/styles";
import KamerImage from "../../images/neudebieb.png";
import { Image } from "../../styled/Image";
import TimeRange from "react-timeline-range-slider";
import { endOfToday, set } from "date-fns";
import { toast } from "react-toastify";
import { isEmpty } from "../../helpers/IsEmpty";
import addMonths from "date-fns/addMonths";
import DatePicker, { ReactDatePicker } from "react-datepicker";
import { getImagesFromDbAndFiles } from "./../../helpers/getImagesFromDb";
import styled from "styled-components";

import Carousel from "../../components/carousel/Carousel";
const GetDate = (hour, date) => {
  if (date !== undefined) {
    return set(date, {
      seconds: 0,
      hours: date.getHours(),
      milliseconds: 0,
      minutes: 0,
    });
  } else {
    return set(new Date(), {
      seconds: 0,
      hours: hour,
      milliseconds: 0,
      minutes: 0,
    });
  }
};

export default function SingleKamer({ match }) {
  const { naam } = match.params;
  const [loading, setLoading] = useState(true);
  const [kamer, setKamer] = useState({});
  const [errorTimeRange, setTimeRangeError] = useState(null);

  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  // const [startDate, endDate] = dateRange;
  const [startDate, setStartDate] = useState(null);
  const [resizedImages, setImages] = useState(null);
  const [timeRangeSliderDate, setTimeRangeSliderDate] = useState(new Date());

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
          setLimite2([
            GetDate(startDate.getHours()),
            GetDate(eindDate.getHours()),
          ]);
          getImagesFromDbAndFiles(
            res.data.naam,
            res.data.attachments,
            false
          ).then((res) => {
            setImages(res[0]);
            console.log(res, "kek");
            setLoading(false);
          }).catch((err) =>{
            console.log(err, "err");
            setLoading(false);
            console.log(kamer);
            setKamer({});
            toast.error(err.response.data.message);
            return Promise.reject(err);
          });
        }
      })
      .catch((err) => {
        console.log(err, "err");
        setLoading(false);
        console.log(kamer);
        setKamer({});
        toast.error(err.response.data.message);
        return Promise.reject(err);
      });
  }, []);

  const [am, setAm] = React.useState([null, null]);
  const [pm, setPm] = React.useState([GetDate(14), GetDate(19)]);
  const [limite2, setLimite2] = useState([GetDate(7), GetDate(17)]);
  const limite = [GetDate(7), GetDate(22)];
  const [disabledIntervals2, setDisabledIntervals2] = useState([]);
  const [errorAm, setErrorAm] = React.useState(false);
  const [alReservatie, setAlReservatie] = React.useState(false);
  const [reservation, setReservation] = React.useState([]);
  const timeRangeSlider = () => {
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

  useEffect(() => {
    if (!isEmpty(kamer) && !loading) {
      getAllKamerByNaamAndGetAllReserverationsOnCertainDay(
      kamer.naam,
      timeRangeSliderDate.toLocaleDateString().split("/").join("-")
      )
      .then((res, err) => {
        if (err) {
          console.log(err);
        } else{
          setReservation(res.data);
          calculateDisabledIntervalsAndOpenInterval(res.data);
        }
      })
      .catch((err) => {
        console.log(err, "err");
        toast.error(err.response.data.message);
        return Promise.reject(err);
      });
      }
  }, [timeRangeSliderDate]);

  useEffect(() => {
    if (!isEmpty(kamer) ) {
      console.log(kamer);
      getAllKamerByNaamAndGetAllReserverationsOnCertainDay(
        kamer.naam,
        timeRangeSliderDate.toLocaleDateString().split("/").join("-")
      )
        .then((res, err) => {
          if(err){

          }else{
            console.log(res, `ok`);
            calculateDisabledIntervalsAndOpenInterval(res.data);
            
            setReservation(res.data);
          }
        })
        .catch((err) => {
          console.log(err, "err");
          toast.error(err.response.data.message);
          return Promise.reject(err);
        });
      // calculateDisabledIntervalsAndOpenInterval();
    }
  }, [kamer]);

  const calculateDisabledIntervalsAndOpenInterval = (res) => {
    let reserveringListObj = [];
    console.log(res, "res");
    if (res !== null) {
      if (res !== 0) {
        res.map((item, index) => {
          reserveringListObj.push({
            start: moment(GetDate(0, new Date(item[1]))).toDate(),
            end: moment(GetDate(0, new Date(item[0]))).toDate(),
          });
        });
      }
    }
    // kamer.startTijd;
    console.log(reserveringListObj, "reserveringListObj");

    setDisabledIntervals2(reserveringListObj);

    generateOpenInterval(res);
  };

  const generateOpenInterval = (reserveringListObj) => {
    let startTijd = new Date(kamer.startTijd);
    let endTijd = new Date(kamer.sluitTijd);
    const interval = 60 * 60000;
    let alReservatieInterval = false;
    while (
      startTijd.getTime() <= endTijd.getTime() - interval &&
      !alReservatieInterval
    ) {
      alReservatieInterval = getOverLap(
        new Date(startTijd.getTime()),
        new Date(startTijd.getTime() + interval),reserveringListObj
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

  const getOverLap = (startDate, eindDate,reserveringListObj) => {
    console.log(reserveringListObj, "rep")
    for (let index = 0; index < reserveringListObj.length; index++) {
      let startReserveringDate = new Date(reserveringListObj[index][1]);
      let eindReserveringDate = new Date(reserveringListObj[index][0]);
      if (
        startDate.getTime() < eindReserveringDate.getTime() &&
        eindDate.getTime() > startReserveringDate.getTime()
      ) {
        return false;
      }
    }
    console.log(startDate, "start")
    console.log(eindDate, "eind123")
    setAm([GetDate(0, startDate), GetDate(0, eindDate)]);
    console.log(am, "am123");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!loading && !isEmpty(kamer)){
      console.log("getting hit")
      if (!errorAm) {
        maakNieuweReservatie(kamer.naam, am[0], am[1])
        .then((res, err) => {
          if (err) {
            console.log(err, "err");
          }else{
          
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
      <SingleKamerStyled>
        <FlexBox z="column" width="60vw">
          <h1>{kamer.naam}</h1>
          <Carousel images={resizedImages} />
        </FlexBox>

        <FlexBox z="column" width="40vw">
          <div>De ruimte is te reserveren vanaf</div>
          <FlexBox style={{ paddingLeft: "3px" }}>
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
          </FlexBox>{" "}
          <div>
            <h3>Openingstijden</h3>
            {showTime()}
            {/* {kamer.reserveringList((item) =>{

                        })} */}
            Gekozen datum: {timeRangeSliderDate.toDateString()}
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="datePicker">
              <DatePicker
                minDate={setStartDateLimit(kamer.startDate)}
                maxDate={dateRange[1]}
                dateFormat="dd/MM/yyyy"
                selected={timeRangeSliderDate}
                onChange={(date) => setTimeRangeSliderDate(date)}
              />
            </div>
            <div className="timeRangeSlider">
              {!(disabledIntervals2 === []) && timeRangeSlider()}
            </div>
            <button type="submit" onClick={(e) => handleSubmit(e)}>submit reservatie</button>
          </form>
        </FlexBox>
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
  .timeRangeSlider {
    padding: 0px;
    width: 40vw;
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
