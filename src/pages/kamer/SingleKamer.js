import React, { useEffect, useState } from "react";
import { getSingleKamer } from "../../functions/kamers";
import moment from "moment";
import { FlexBox, setRem } from "../../styled/styles";
import KamerImage from "../../images/neudebieb.png";
import { Image } from "../../styled/Image";
import TimeRange from "react-timeline-range-slider";
import { endOfToday, set } from "date-fns";
import { isEmpty } from "../../helpers/IsEmpty";
import addMonths from "date-fns/addMonths";
import DatePicker, { ReactDatePicker } from "react-datepicker";

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
  const [loading, setLoading] = useState(false);
  const [kamer, setKamer] = useState({});
  const [errorTimeRange, setTimeRangeError] = useState(null);

  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  // const [startDate, endDate] = dateRange;
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    setLoading(true);
    getSingleKamer(naam).then((res, err) => {
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
        // console.log(date.getHours(), "hourss");
        setLoading(false);
        // console.log(new Date(kamer.sluitTijd), "sluittijd");
        // console.log(res.data);
      }
    });
  }, []);

  const [am, setAm] = React.useState([GetDate(9), GetDate(12)]);
  const [pm, setPm] = React.useState([GetDate(14), GetDate(19)]);
  const [limite2, setLimite2] = useState([GetDate(7), GetDate(17)]);
  const limite = [GetDate(7), GetDate(22)];
  const [disabledIntervals2, setDisabledIntervals2] = useState([]);
  const [errorAm, setErrorAm] = React.useState(false);
  const [errorPm, setErrorPm] = React.useState(false);
  const [alReservatie, setAlReservatie] = React.useState(false);
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
    if (!isEmpty(kamer)) {
      calculateDisabledIntervalsAndOpenInterval();
    }
  }, [kamer]);

  useEffect(() =>{
      console.log(alReservatie, " alreservatie");
  }, [alReservatie])

  const calculateDisabledIntervalsAndOpenInterval = () => {
    let reserveringListObj = [];
    if (kamer.reserveringList.length !== 0) {
      kamer.reserveringList.map((item, index) => {
        reserveringListObj.push({
          start: moment(GetDate(0, new Date(item.start))).toDate(),
          end: moment(GetDate(0, new Date(item.end))).toDate(),
        });
      });
    }
    // kamer.startTijd;
    console.log(reserveringListObj, "reserveringListObj");

    setDisabledIntervals2(reserveringListObj);

    generateOpenInterval();
  };

  const generateOpenInterval = () => {
    let startTijd = new Date(kamer.startTijd);
    let endTijd = new Date(kamer.sluitTijd);
    const interval = 60 * 60000;
    let intervalFound = false;
    while (
      (startTijd.getTime() <= endTijd.getTime() - interval) && (!alReservatie)
      ) {
      
      getOverLap(
        new Date(startTijd.getTime()),
        new Date(startTijd.getTime() + interval)
      );
      startTijd = new Date(startTijd.getTime() + interval);
    }
  };

  const getOverLap = (startDate, eindDate) => {
    console.log(alReservatie, "alreserveratie");
    //   console.log(startDate, eindDate, "dates");
    // console.log(new Date(kamer.reserveringList[0].start), "reserverinlist[0]");
    let beginEnEindTijd = [];
    for (let index = 0; index < kamer.reserveringList.length; index++) {
      let startReserveringDate = new Date(kamer.reserveringList[index].start);
      let eindReserveringDate = new Date(kamer.reserveringList[index].end);
      if (
        startDate.getTime() < eindReserveringDate.getTime() &&
        eindDate.getTime() > startReserveringDate.getTime()
      ) {
        return false;
      
      } else {
        beginEnEindTijd = [GetDate(0, startDate), GetDate(0, eindDate)];
        setAlReservatie(true)
        setAm(beginEnEindTijd)
        console.log(beginEnEindTijd, "bg");
      }
    }
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

  const handleSubmit = (e, startDate) => {
    e.preventDefault();
  };
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const setStartDateLimit = () => {
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

  return (
    <FlexBox x={"start"}>
      {isEmpty(kamer) ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>
            <h1>{kamer.naam}</h1>
            <Image logo={KamerImage} />
          </div>
          <FlexBox>
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
            </FlexBox>
          </FlexBox>
          <div>
            <h3>Openings tijden</h3>
            {showTime()}
            {/* {kamer.reserveringList((item) =>{

                        })} */}
          </div>
          <form onSubmit={(e) => handleSubmit(e, startDate)}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={() => setStartDateLimit()}
              minDate={() => setStartDateLimit(kamer.startDate)}
              maxDate={dateRange[1]}
              showMinute={false}
              showSecond={false}
              timeFormat="HH:mm"
              filterTime={filterPassedTime}
              dateFormat="dd/MM/yyyy h:mm aa"
              dateFormat="Pp"
              timeFormat="p"
              locale="nl-NL"
              timeIntervals={60}
              showTimeSelect
              showDisabledMonthNavigation
            />
            {!(disabledIntervals2 === []) && timeRangeSlider()}
            <button type="submit">submit</button>
          </form>

          {/* <DatePicker
                     timeInputLabel="Time:"
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        showTimeSelect
                        onChange={(update) => {
                            setDateRange(update);
                        }}
                        isClearable={true}
                    /> */}
        </div>
      )}
    </FlexBox>
  );
}
