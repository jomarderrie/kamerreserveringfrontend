import React, { useEffect, useState } from "react";
import NieuweKamerForm from "../../components/kamer/NieuweKamerForm";
import { FlexBox } from "../../styled/styles";
import { getSingleKamer } from "../../functions/kamers";

export default function EditSingleKamer({ match }) {
  const { naam } = match.params;
  const [loading, setLoading] = useState(false);
  const [kamer, setKamer] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getSingleKamer(naam).then((res, err) => {
      if (err) {
        setLoading(false);
        setError(err);
      } else {
        setLoading(false);
        setKamer(res.data);
        console.log(res.data);
      }
    });
  }, []);

  return (
    <FlexBox z={"column"}>
      <h2 style={{ paddingTop: "40px" }}>Verander kamer met de naam {naam}</h2>
      {loading && <div>Loading...</div>}
      {!loading && <NieuweKamerForm kamer={kamer}  naam={naam} />}
    </FlexBox>
  );
}
