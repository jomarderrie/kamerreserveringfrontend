import React, {useContext, useEffect, useState} from "react";
import NieuweKamerForm from "../../components/kamer/NieuweKamerForm";
import { FlexBox } from "../../styled/styles";
import { getSingleKamer } from "../../functions/kamers";
import {AuthContext} from "../../context/AuthContext";

export default function EditSingleKamer(props) {
  const { naam } = props.match.params;
  const {user, token} = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [kamer, setKamer] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {

    setLoading(true);
    getSingleKamer(naam, token).then((res, err) => {
      if (err) {
        setLoading( false);
        setError(err);
      } else {
        setLoading(false);
        setKamer(res.data);
      }
    });
  }, []);

  return (
    <FlexBox z={"column"}>
      <h2 style={{ paddingTop: "20px" }}>Verander kamer met de naam {naam}</h2>
      {loading && <div>Loading...</div>}
      {!loading && <NieuweKamerForm kamer={kamer}  naam={naam} />}
    </FlexBox>
  );
}
