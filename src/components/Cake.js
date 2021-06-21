import {Link, withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {connect} from "react-redux";
import {
    addCartMiddleware,
    removeCakeFromCartMiddleware,
    removeOneCakeFromCartMiddleware
} from "../reduxstore/Middlewares";

let Cake = (props) => {

    const addOneCakeToCart = (cakeId) => {
        props.dispatch(addCartMiddleware(cakeId))
    }

    const removeOneCakeFromCart = (cakeId) => {
        props.dispatch(removeOneCakeFromCartMiddleware(cakeId))
    }

    const removeCakeFromCart = (cakeId) => {
        props.dispatch(removeCakeFromCartMiddleware(cakeId))
    }

    return (
        <div className="col-md-3" style={{marginTop: (props.page === 'cart' ? '27px' : '0px')}}>
            <div className={"card " + (props.page !== 'cart' && props.page !== 'cart_summary' && props.page !== 'admin' ? 'zoom' : '') } style={{width: '18rem'}}>
                <Link to={'/cake/'+props.data.cakeid}><img src={props.data.image} className="card-img-top" alt="..." style={{maxHeight: '213px', minHeight: '213px'}} /></Link>
                <div className="card-body">
                    <h5 className="card-title">{props.data.name}</h5>
                    <p className="card-text">Rs. {props.data.price} /-</p>
                    { props.page === 'cart' && <p className="card-text">
                        <button className="btn btn-success" onClick={() => addOneCakeToCart(props.data)}>
                            <span>
                                <FontAwesomeIcon icon="plus"/>
                            </span>
                        </button>
                        &nbsp;&nbsp;&nbsp;{props.data.quantity}&nbsp;&nbsp;&nbsp;
                        <button className="btn btn-warning" onClick={() => removeOneCakeFromCart(props.data.cakeid)}>
                            <span>
                                <FontAwesomeIcon icon="minus"/>
                            </span>
                        </button>
                    </p> }
                    { props.page === 'cart' &&
                        <button className="btn btn-danger" onClick={() => removeCakeFromCart(props.data.cakeid)}>
                                <span>
                                    <FontAwesomeIcon icon="trash"/>
                                </span>
                        </button>
                    }
                    { props.page === 'cart_summary' && <p className="card-text">Quantity {props.data.quantity} </p> }
                </div>
            </div>
        </div>
    )
}

Cake = connect(function (state, props){
    if (state.CartReducer.removed) {
        state.CartReducer.removed = false
        window.location.reload()
    }
})(Cake)
export default withRouter(Cake)