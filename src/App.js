import React, {lazy, Suspense, useContext, useEffect} from "react";
import {Route, Switch, browserHistory} from "react-router-dom";
import Home from "./pages/Home";
import Loading from "./components/Loading";
import Navbar from "./components/navbar/Navbar";
import Register from "./pages/auth/Register";
import Kamers from "./pages/kamer/Kamers";
import SingleKamer from "./pages/kamer/SingleKamer";
import Login from "./pages/auth/Login";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditSingleKamer from "./pages/kamer/EditSingleKamer";
import MaakNieuweKamer from "./pages/kamer/MaakNieuweKamer";
import Profiel from "./pages/gebruiker/Profiel";
import SingleGebruiker from "./pages/gebruiker/SingleGebruiker";
import Gebruikers from "./pages/gebruiker/Gebruikers";
// const Loading = lazy(() => import("./components/Loading"));
import Reservaties from "./pages/reservaties/Reservaties"
import setAuthToken from "./helpers/setAuthToken";
import {KamersContext} from "./context/KamersContext";
import {AuthContext} from "./context/AuthContext";
import {getHuidigeGebruikerMetToken} from "./functions/user";
import AdminReservaties from "./pages/admin/Reservaties";

function App() {
    const {
        user, setUser, token, setToken
    } = useContext(AuthContext);

    useEffect(() => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
            console.log("gangster testrap")
            getHuidigeGebruikerMetToken(localStorage.token).then((res, err) => {
                if (res.data) {
                    setUser(res.data)
                }
            })
        } else {
            localStorage.removeItem("token")
        }
    }, []);


    return (
        <Suspense fallback={Loading}>

            <Navbar/>
            <ToastContainer/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/kamers" component={Kamers}/>
                <Route exact path="/kamer/new" component={MaakNieuweKamer}/>
                <Route exact path="/kamer/:naam" component={SingleKamer}/>
                <Route exact path="/kamer/:naam/edit" component={EditSingleKamer}/>
                <Route exact path="/gebruikers" component={Gebruikers}/>
                <Route exact path="/reservaties" component={Reservaties}/>
                <Route exact path="admin/reservaties" component={AdminReservaties}/>
                <Route exact path="/gebruiker/:voornaam/:achternaam" component={SingleGebruiker}/>
                <Route exact path="/profiel/:naam/:achterNaam" component={Profiel}/>
            </Switch>

        </Suspense>
    );
}

export default App;
