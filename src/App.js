import React, { lazy, Suspense } from "react";
import { Route, Switch,browserHistory } from "react-router-dom";
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


// const Home = lazy(() => import("./pages/Home"));
//
// const Loading = lazy(() => import("./components/Loading"));

function App() {

    return (
        <Suspense fallback={Loading}>
    
                <Navbar />
                <ToastContainer/>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/kamers" component={Kamers} />
                    <Route exact path="/kamer/new" component={MaakNieuweKamer} />
                    <Route exact path="/kamer/:naam" component={SingleKamer} />
                    <Route exact path="/kamer/:naam/edit" component={EditSingleKamer} />
            
                </Switch>
        
        </Suspense>
    );
}

export default App;
