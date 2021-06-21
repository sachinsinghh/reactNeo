import {useEffect, useState} from "react";
import axios from "axios";

const Orders = () => {
    const [orders, getOrders] = useState([])

    useEffect(() => {
        axios({
            url: process.env.REACT_APP_API_BASE_URL + '/cakeorders',
            method: 'post'
        }).then(res => {
            const ordersList = res.data.cakeorders
            getOrders(ordersList)
        }, err => {})
    }, [])

    return (
        <div className="container" style={{marginTop: "100px"}}>
            <h1>My Orders</h1>
            { orders.length > 0 && <div className="accordion" id="accordionExample">
                {
                    orders.map((each, index) => {
                        return (
                            <>
                                <div className="card">
                                    <div className="card-header" id={"heading"+(index)}>
                                        <h2 className="mb-0">
                                            <button className="btn btn-link btn-block text-left collapsed" type="button"
                                                    data-toggle="collapse" data-target={"#collapse"+(index)}
                                                    aria-expanded="true" aria-controls={"collapse"+(index)}>
                                                Order #: {each.orderid} on {each.orderdate} for {each.name}
                                            </button>
                                        </h2>
                                    </div>

                                    <div id={"collapse"+(index)} className="collapse" aria-labelledby={"heading"+(index)}
                                         data-parent="#accordionExample">
                                        {
                                            each.cakes.map((eachCake, cakeIndex) => {
                                                return (
                                                    <div className="row">
                                                        <div className="card col-md-3">
                                                            <div className="card-body">
                                                                <img src={eachCake.image} className="card-img-top" alt="..." style={{maxHeight: '213px', minHeight: '213px'}} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <h4>{eachCake.name}</h4>
                                                            <div style={{textAlign : 'left'}}>
                                                                <strong>Name :</strong> {eachCake.name}
                                                            </div>
                                                            <div style={{textAlign : 'left'}}>
                                                                <strong>Price :</strong> Rs. {eachCake.price} /-
                                                            </div>
                                                            <div style={{textAlign : 'left'}}>
                                                                <strong>Quantity :</strong> {eachCake.quantity}
                                                            </div>
                                                            <div style={{textAlign : 'left'}}>
                                                                <strong>Weight :</strong> {eachCake.weight}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div> }
            {orders.length === 0 && <div className="accordion" id="accordionExample">
                No Orders Found!!
            </div>}
        </div>
    )
}

export default Orders