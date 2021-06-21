import {useParams, withRouter} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Cake from "./Cake";
import StarRatings from 'react-star-ratings';
import {connect} from "react-redux";
import {addCartMiddleware} from "../reduxstore/Middlewares";

let CakeDetails = (props) => {
    const query = useParams();
    const [cakes, getCakes] = useState([]);
    const [relatedCakes, getRelatedCakes] = useState([]);
    let cakeList = undefined

    useEffect(() => {
        axios({
            url: process.env.REACT_APP_API_BASE_URL +'/cake/'+query.cakeId,
            method: 'get'
        }).then(res => {
            cakeList = res.data.data
            getCakes(cakeList);
        }, err => {}).then(res => {
            axios({
                url: process.env.REACT_APP_API_BASE_URL +'/searchcakes?q='+cakeList.flavour,
                method: 'get'
            }).then(res => {
                const relatedCakeList = res.data.data
                getRelatedCakes(relatedCakeList);
            }, err => {
            })
        }, err => {})
    }, [query.cakeId])

    let addToCart = (data) => {
        props.dispatch(addCartMiddleware(data))
    }

    return (
        <div className="container" style={{marginTop: "100px"}}>
            <div className="row">
                {
                    <Cake data={cakes} page="details"/>
                }
                <div className="card col-md-8" style={{width: '18rem'}}>
                    <h1>{cakes.name}</h1>
                    <h6>{cakes.description}</h6>
                    <div style={{textAlign : 'left'}}>
                        <strong>Price :</strong> Rs. {cakes.price} /-
                    </div>
                    <div style={{textAlign : 'left'}}>
                        <strong>Flavour :</strong> {cakes.flavour}
                    </div>
                    { cakes.ingredients && cakes.ingredients.length > 0 && <div style={{textAlign : 'left'}}>
                        <strong>Ingredients :</strong> {cakes.ingredients
                        .map(t => <span>{t}</span>)
                        .reduce((prev, curr) => [prev, ', ', curr])}
                    </div>}
                    <div style={{textAlign : 'left'}}>
                        <strong>Egg Less :</strong> {cakes.eggless ? 'Yes' : 'No'}
                    </div>
                    {/* <div style={{textAlign : 'left'}}>
                        <strong>Ratings :</strong>
                        <StarRatings
                            rating={cakes.ratings}
                            starRatedColor="yellow"
                            numberOfStars={5}
                            starDimension="25px"
                            starSpacing="1px"
                            name='rating'
                        />
                    </div> */}
                    <div style={{textAlign : 'left'}}>
                        <button onClick={ () => addToCart(cakes)} className="btn btn-primary">Add To Cart</button>
                    </div>
                </div>
            </div>
            <h2>Similar Products</h2>
            <div className="row">
                {
                    relatedCakes.map((each, index) => {
                        return (
                            <Cake style={{ marginTop: "2em"}} data={each} key={index} page="details"/>
                        )
                    })
                }
            </div>
        </div>
    )
}

CakeDetails = connect(function (state, props){
    if (state.CartReducer.success) {
        props.history.push('/cart')
        state.CartReducer.success = false
    }
})(CakeDetails);

export default withRouter(CakeDetails)