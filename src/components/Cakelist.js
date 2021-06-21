import Cake from './Cake'
import axios from "axios";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const Cakelist = (props) => {
    const [cakes, getCakes] = useState([]);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        axios({
            url: process.env.REACT_APP_API_BASE_URL +'/allcakes',
            method: 'get'
        }).then(res => {
            const cakeList = res.data.data
            getCakes(cakeList);
            setLoading(false)
        }, err => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            axios({
                url: process.env.REACT_APP_API_BASE_URL + '/cakecart',
                method: 'post',
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
        // <div className="row col-md-12">
        //     {
        //         cakes.map((each, index) => {
        //             return (
                        
        //                 <Cake data={each} key={index} page="list"/>
        //             )
        //         })
        //     }
        //     <>
        //         { isLoading && <div>Loading....</div>}
        //     </>
        // </div>
        <div className="row" style={{ justifyContent: "space-around", padding: "1% 2%" }}>

        {cakes.map((each, index) => {

          return (
            <Cake data={each} key={index} page="list"/>)
        })}
         <>
                { isLoading && <div>Loading....</div>}
        </>
      </div>
    )
}

export default connect() (withRouter(Cakelist))