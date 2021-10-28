
import React, { useEffect, useState } from 'react'
import { getSingleKamer } from '../../functions/kamers';
import moment from 'moment';
import { FlexBox, setRem } from '../../styled/styles';
import KamerImage from "../../images/neudebieb.png"
import { Image } from '../../styled/Image';
import { isEmpty } from '../../helpers/IsEmpty';
import addMonths from 'date-fns/addMonths';
import DatePicker, { ReactDatePicker } from 'react-datepicker'

export default function SingleKamer({ match }) {
    const { naam } = match.params;
    const [loading, setLoading] = useState(false);
    const [kamer, setKamer] = useState({});
    const [error, setError] = useState(null);

    // const [dateRange, setDateRange] = useState([null, null]);
    // const [startDate, endDate] = dateRange;
    const [startDate, setStartDate] = useState(null);
    useEffect(() => {
        setLoading(true)
        getSingleKamer(naam).then((res, err) => {
            if (err) {
                setLoading(false);
                setError(err)
            } else {
                setKamer(res.data)
                setLoading(false);
                console.log(res.data);
            }
        });
    }, [])
    useEffect(() => {
        console.log(kamer);
        if (!isEmpty(kamer)) {
            let sluitTijd = new Date(kamer.sluitTijd)
            console.log(sluitTijd.toLocaleTimeString());
            console.log(sluitTijd.toLocaleString());
        }

        // showTime()
    }, [kamer])


    const showTime = () => {
        let results = []
        let startTijd = new Date(kamer.startTijd);
        let endTijd = new Date(kamer.sluitTijd)
        const interval = 60 * 60000; //1 uur

        // console.log(  new Date(startTijd.getTime()));
        console.log(startTijd.getHours());
        // while (startTijd.getTime() <= endTijd.getTime() - interval) {

        //     console.log(new Date(startTijd.getTime()).toLocaleTimeString())
        //     results.push({ "startTijd": new Date(startTijd.getTime()).toLocaleTimeString(), "eindTijd": new Date(startTijd.getTime() + interval).toLocaleTimeString() })
        //     startTijd = new Date(startTijd.getTime() + interval);
        // }
        console.log(results);

        return results.map((item, index) => {
            return <div key={index}>
                <p>
                    {item.startTijd} - {item.eindTijd}
                </p>

            </div>

        })
    }

    const handleSubmit = (e, startDate) => {
        e.preventDefault();
        console.log(startDate);
    }
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };

    const setStartDateLimit = (date) => {
        let vandaag =new Date();
        // if(vandaag.)
        return new Date();
    }
    const sameDay = (d1, d2) => {
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
      };

    return (
        <FlexBox x={"start"}>
            {isEmpty(kamer) ? <div>Loading...</div> :
                <div>
                    <div>
                        <h1>
                            {kamer.naam}
                        </h1>
                        <Image logo={KamerImage} />
                    </div>
                    <FlexBox>
                        <div>
                            De openingstijd is van:
                        </div>
                        <FlexBox style={{ paddingLeft: "3px" }}>
                            {!isEmpty(kamer.startTijd) ? new Date(kamer.startTijd).toLocaleDateString('nl-NL') : <div>...Loading</div>}
                            <span style={{ padding: "5px" }}>
                                tot
                            </span>
                            {!isEmpty(kamer.sluitTijd) ? new Date(kamer.sluitTijd).toLocaleDateString('nl-NL') : <div>...Loading</div>}
                            <br></br>
                            {/* {kamer.startTijd.toLocaleTimeString()} tot {kamer.sluitTijd} */}
                        </FlexBox>
                        <FlexBox> &nbsp; en openingstijden van &nbsp;
                            {!isEmpty(kamer.startTijd) ? new Date(kamer.startTijd).toLocaleTimeString('nl-NL') : <div>...Loading</div>}
                            &nbsp;
                            tot
                            &nbsp;
                            {!isEmpty(kamer.sluitTijd) ? new Date(kamer.sluitTijd).toLocaleTimeString('nl-NL') : <div>...Loading</div>}
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
                            // minDate={() => setStartDateLimit(kamer.startDate))}
                            minDate={setStartDateLimit(kamer.startDate)}
                            maxDate={new Date(kamer.eindTijd)}
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
                    <div>
                    </div>
                </div>
            }
        </FlexBox>
    )
}
