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
import AdminReservaties from "./pages/reservaties/AdminReservaties";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import UserRoleRoute from "./components/routes/UserRoleRoute";
import LoginRoute from "./components/routes/LoginRoute";
import ErrorPage from "./pages/ErrorPage";

function App() {
    const {
        user, setUser, token, setToken
    } = useContext(AuthContext);

    useEffect(() => {
        if (localStorage.token) {
            getHuidigeGebruikerMetToken(localStorage.token).then((res, err) => {
                if (res.data) {
                    setAuthToken(localStorage.token)
                    setToken(localStorage.token)
                    setUser(res.data)
                }else{
                    localStorage.removeItem("token")
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
                <LoginRoute exact path="/" component={Home}/>
                <LoginRoute exact path="/register" component={Register}/>
                <LoginRoute exact path="/login" component={Login}/>
                <UserRoute exact path="/kamers" component={Kamers}/>
                <AdminRoute exact path="/kamer/new" component={MaakNieuweKamer}/>
                <UserRoute exact path="/kamer/:naam" component={SingleKamer}/>
                <AdminRoute exact path="/kamers/:naam/edit" component={EditSingleKamer}/>
                <AdminRoute exact path="/gebruikers" component={Gebruikers}/>
                <UserRoute exact path="/reservaties" component={Reservaties}/>
                <AdminRoute exact path="/admin/reservaties" component={AdminReservaties}/>
                <UserRoleRoute exact path="/gebruiker/:voornaam/:achternaam" component={SingleGebruiker}/>
                <UserRoleRoute exact path="/profiel/:naam/:achterNaam" component={Profiel}/>
                <Route path="/*" component={ErrorPage} />
            </Switch>

        </Suspense>
    );
}

export default App;
