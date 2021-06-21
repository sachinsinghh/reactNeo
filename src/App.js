import './App.css';
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import React, {Suspense, useEffect, useState} from 'react';
import Login from "./components/Login";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Search from "./components/Search";
import CakeDetails from "./components/CakeDetails";
import axios from "axios";
import Checkout from "./components/Checkout";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faTrash, faPlus, faEdit, faMinus, faArrowRight, faUser} from "@fortawesome/free-solid-svg-icons";
import Orders from "./components/Orders";
import Admin from "./components/Admin";

library.add(faTrash, faPlus, faEdit, faMinus, faArrowRight, faUser)

var Cart = React.lazy(() => import('./components/Cart'))

Cart = <Suspense fallback={<div>Loading...</div>}><Cart/></Suspense>

function App() {
    const token = localStorage.getItem('token');
    const [text, setLogin] = useState(false);

    const loggedIn = () => {
        setLogin(true);
    }

    axios.interceptors.request.use((request) => {
        request.headers["authtoken"] = localStorage.getItem('token')
        return request
    })
    /*useEffect(() => {
        if (token) {
            axios({
                method: 'get',
                url: process.env.REACT_APP_API_BASE_URL + '/getuserdetails',
                headers: {
                    authtoken: token
                }
            }).then(res => {
                setLogin(true)
            }, err => {})
        }
    }, [])*/
  return (
    <div className="App">
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login"><Login text={loggedIn} /></Route>
                {/*<Route exact path="/login" component={Login} />*/}
                <Route exact path="/search" component={Search} />
                <Route exact path="/cake/:cakeId" component={CakeDetails} />
                <Route exact path="/cart">{Cart}</Route>
                <Route path="/checkout" component={Checkout} />
                <Route exact path="/orders" component={Orders} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/*" component={PageNotFound} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
