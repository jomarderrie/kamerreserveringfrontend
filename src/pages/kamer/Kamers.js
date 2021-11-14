import React, { Component, useEffect, useState } from "react";
import { deleteKamerMetFetch, getAllKamers, getImageFromDb } from "../../functions/kamers";
import { set } from "react-hook-form";
import { FlexBox } from "../../styled/styles";
import KamerCard from "../../components/kamer/KamerCard";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteKamer } from "../../functions/kamers";
import { Image } from "../../styled/Image";

function Kamers() {
  const [kamers, setKamers] = useState([]);
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    setLoading(true);
    getAllKamers().then((res, err) => {
      console.log(res);
      setKamers(res.data);
      console.log(res.data, "kamers");
      setLoading(false);
    });
  }, []);

  const deleteKamerOnClick = async (e) => {
    console.log(e.target.value);

    await deleteKamer(e.target.value)
      .then((res, err) => {
        if (err) {
          toast.error("Error met het toevoegen van een kamer");
        } else {
          setKamers((prevKamer) => {
            return prevKamer.filter((kamer) => {
              return kamer.naam !== e.target.value;
            });
          });
          toast.success(`Delete kamer met naam ${e.target.value}`);
        }
      })
      .catch((k) => {
        toast.error(k.response.data.message);
        return Promise.reject(k);
      });
  };

  return (
    <div>
      <h2>Kamers</h2>
      <Link
        className="btn btn-pink"
        role="button"
        to={`/kamer/new`}
        type="button"
      >
        Maak nieuwe kamer
      </Link>

      <FlexBox>
        {kamers.map((kamer,key) => {
          return (
            <div key={key}>
              <KamerCard kamer={kamer} deleteKamer={deleteKamerOnClick} image={kamer.attachment}/>
            </div>
          );
        })}
        {/* {() => getImageFromDb()} */}
      </FlexBox>
    </div>
  );
}

// class Kamers extends Component {
//
//
//     render() {
//         return (
//             <div>
//                 hello from kamers
//             </div>
//         );
//     }
// }

export default Kamers;
