
import React, { useEffect, useState } from 'react'
import { getSingleKamer } from '../../functions/kamers';
import moment from 'moment';

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
                showTime()
                setLoading(false);
                setKamer(res.data)
                console.log(res.data);
            }
        });
    }, [])


    const showTime = () => {
        let results = []
        let startTijd = new Date(kamer.startTijd);
        let endTijd = new Date(kamer.sluitTijd)
        const interval = 60 * 60000; //1 uur
        while (startTijd.getTime() <= endTijd.getTime() - interval) {
            
            console.log(new Date(startTijd.getTime()).toLocaleTimeString())
            results.push({ "startTijd": new Date(startTijd.getTime()).toLocaleTimeString(), "eindTijd": new Date(startTijd.getTime() + interval).toLocaleTimeString() })
            startTijd = new Date(startTijd.getTime() + interval);
        }
        console.log(results);
        
         return results.map((item, index) => {
             return <div key={index}>
                 <p>
                 {item.startTijd} - {item.eindTijd}
                 </p>
        
             </div>
            console.log(item)
            // <div key={index}>
            //    hey from item
            // </div>
        })
    }



    return (
        <div>
            {loading ? <div>Loading...</div> :
                <div>
                    <div>
                        <h1>
                            {kamer.naam}
                        </h1>
                    </div>
                    <div>
                        {showTime()}
                        {/* {kamer.reserveringList((item) =>{

                        })} */}
                    </div>
                </div>
            }
        </div>
    )
}
