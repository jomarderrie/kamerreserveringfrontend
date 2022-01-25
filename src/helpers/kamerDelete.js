// import { toast } from "react-toastify";

// export const deleteKamerOnClick = async (naam, setKamers) => {
//     // console.log(e.target);
//     console.log(naam, "oekoek");
//   await deleteKamer(naam)
//     .then((res, err) => {
//       if (err) {
//         toast.error("Error met het toevoegen van een kamer");
//       } else {
//         setKamers((prevKamer) => {
//           return prevKamer.filter((kamer) => {
//             return kamer.naam !== naam;
//           });
//         });
//         toast.success(`Delete kamer met naam ${naam}`);
//       }
//     })
//     .catch((k) => {
//       toast.error(k.response.data.message);

//       return Promise.reject(k);
//     });
// };
