
import React, { useEffect, useState } from 'react'
import { getSingleKamer } from '../../functions/kamers';
import moment from 'moment';
import { FlexBox, setRem } from '../../styled/styles';
import KamerImage from "../../images/neudebieb.png"
import { Image } from '../../styled/Image';
import { isEmpty } from '../../helpers/IsEmpty';

export default function SingleKamer({ match }) {
    const { naam } = match.params;
    const [loading, setLoading] = useState(false);
    const [kamer, setKamer] = useState({});
    const [error, setError] = useState(null);

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



    return (
        <FlexBox x={"start"}>
            {loading ? <div>Loading...</div> :
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
                        <FlexBox style={{paddingLeft:"3px"}}>
                            {!isEmpty(kamer.startTijd) ? new Date(kamer.startTijd).toLocaleString() : <div>...Loading</div>}
                            <span style={{padding:"5px"}}>
                                tot
                            </span>
                            {!isEmpty(kamer.sluitTijd) ? new Date(kamer.sluitTijd).toLocaleString() : <div>...Loading</div>}
                            {/* {kamer.startTijd.toLocaleTimeString()} tot {kamer.sluitTijd} */}
                        </FlexBox>
                    </FlexBox>
                    <div>
                        <h3>Openings tijden</h3>
                        {showTime()}
                        {/* {kamer.reserveringList((item) =>{

                        })} */}
                    </div>
                </div>
            }
        </FlexBox>
    )
}
