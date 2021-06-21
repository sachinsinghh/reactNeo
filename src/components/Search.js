import querystring from 'query-string';
import {useEffect, useState} from "react";
import axios from "axios";
import Cake from "./Cake";
const Search = (props) => {
    const query = querystring.parse(props.location.search);
    const [cakes, getCakes] = useState([]);

    useEffect(() => {
        axios({
            url: process.env.REACT_APP_API_BASE_URL +'/searchcakes?q='+query.q,
            method: 'get'
        }).then(res => {
            const cakeList = res.data.data
            getCakes(cakeList);
        }, err => {
        })
    }, [query.q])

    return (
        <div className="container" style={{marginTop: "100px"}}>
            <h4>Showing search results of: <span style={{color : 'red'}}>{query.q}</span></h4>
            <div className="row">
                {
                    cakes.map((each, index) => {
                        return (
                            <Cake data={each} key={index} page="search"/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Search