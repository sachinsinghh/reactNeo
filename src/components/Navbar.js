import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom'
import cartLogo from '../images/shopping-cart.png'
import {connect} from "react-redux";
import {useEffect} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Navbar = (props) => {
    let searchString;
    let buttonClick = (event) => {
        event.preventDefault()
        if (searchString) {
            const url = '/search?q=' + searchString;
            props.history.push(url);
        }
    }

    let getSearchString = (event) => {
        searchString = event.target.value;
    }

    let logout = () => {
        props.dispatch({
            type: "LOGOUT",
            payload: {
                token: localStorage.getItem('token')
            }
        })
        props.history.push('/')
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            axios({
                url: process.env.REACT_APP_API_BASE_URL + '/cakecart',
                method: 'post'
            }).then(res => {
                const cakeList = res.data.data
                props.dispatch({
                    type: "SHOW_CART",
                    payload: {
                        data: cakeList
                    }
                })
            }, err => {
            })
        }
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <Link to="/" className="navbar-brand">Cake</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>

            <div className="item collapse navbar-collapse" id="navbarSupportedContent">
               
                {props.isLoggedIn && <form className="form-inline col-lg-8">
                    <input className="form-control mr-sm-2 col-md-10" type="search" placeholder="Search" aria-label="Search" onChange={getSearchString} />
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={buttonClick}>Search</button>
                </form> }
                {!props.isLoggedIn && <form className="form-inline col-lg-10">
                    <input className="form-control mr-sm-2 col-md-10" type="search" placeholder="Search" aria-label="Search" onChange={getSearchString} />
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={buttonClick}>Search</button>
                </form> }
                {props.isLoggedIn && <Link to="/cart" style={{ marginRight:"10%" }} className="my-2 my-sm-0 ml-sm-2">
                    <span className="notify-badge">{props.totalItems}</span>
                    <img src={cartLogo} className="d-block" alt="Cart Logo" />
                </Link> }
                {props.isLoggedIn && <Link to={'/orders'} className="my-2 my-sm-0 ml-sm-1" style={{cursor : 'pointer'}}>Orders</Link>}
                {props.isLoggedIn && <a onClick={logout} className="my-2 my-sm-0 ml-sm-2" style={{cursor : 'pointer'}}>Sign Out</a>}
                {!props.isLoggedIn && <Link to="/login" className="my-2 mr-sm-2">Log In |</Link>}
                {!props.isLoggedIn && <Link to="/signup" className="my-2 my-sm-0 ml-sm-2">Sign Up</Link>}
                {props.isLoggedIn && localStorage.getItem('userData') && ((JSON.parse(localStorage.getItem('userData'))).email === 'trehanrishabh6@gmail.com' || (JSON.parse(localStorage.getItem('userData'))).email === 'ashu.lekhi0540@gmail.com') && <Link to="/admin" className="my-2 my-sm-0 ml-sm-2">
                   
                    <span title="Admin">
                        <FontAwesomeIcon icon="user"/>
                    </span>
                </Link> }
                {props.isLoggedIn && <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link">Welcome, {props.username}</a>
                    </li>
                </ul> }
             
            </div>
        </nav>
    )
}

export default connect((state, props) => {
    return {
        username: state.AuthReducer.username,
        isLoggedIn: state.AuthReducer.isLoggedIn,
        totalItems: state.CartReducer.totalItems
    }
}) (withRouter(Navbar));