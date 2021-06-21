import {useEffect, useState} from "react";
import axios from "axios";
import Cake from "./Cake";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withRouter} from "react-router-dom";
import {useDispatch} from "react-redux";

const Admin = (props) => {
    const dispatch = useDispatch()
    const [cakes, getCakes] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [cakeName, setCakeName] = useState('')
    const [cakeDesc, setCakeDesc] = useState('')
    const [cakePrice, setCakePrice] = useState('')
    const [cakeWeight, setCakeWeight] = useState('')
    const [cakeImage, setCakeImage] = useState('')
    const [uploadCakeImage, setUploadCakeImage] = useState('')
    const [cakeType, setCakeType] = useState('')
    const [cakeEggless, setCakeEggless] = useState(false)
    const [cakeFlavour, setCakeFlavour] = useState('')
    const [fields, setFields] = useState([{value: null}])
    let cakeIngredients = []

    const token = localStorage.getItem('token')

    if (!token) {
        props.history.push('/login')
    }

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

    const fileUpload = (event) => {
        setCakeImage(URL.createObjectURL(event.target.files[0]))
        let formData = new FormData()
        formData.append('file', event.target.files[0])
        axios({
            url: process.env.REACT_APP_API_BASE_URL + '/upload',
            method: 'post',
            data: formData
        }).then(res => {
            setUploadCakeImage(res.data.imageUrl)
        }, err => {})
    }

    const handleAdd = () => {
        const values = [...fields]
        values.push({value: null})
        setFields(values)
    }

    const handleChange = (i, event) => {
        const values = [...fields]
        values[i].value = event.target.value
        setFields(values)
    }

    const handleRemove = i => {
        const values = [...fields]
        values.splice(i, 1)
        setFields(values)
    }

    const submitCake = (event) => {
        event.preventDefault()
        fields.map((each, index) => {
            cakeIngredients.push(each.value)
        })
        console.log('cakeIngredients', cakeIngredients)
        dispatch({
            type: 'ADD_CAKE',
            payload: {name: cakeName, description: cakeDesc, price: cakePrice, weight: cakeWeight, image: uploadCakeImage,
                type: cakeType, eggless: cakeEggless, flavour: cakeFlavour, ingredients: cakeIngredients}
        })
        cakeIngredients = []
    }

    return (
        <div className="container" style={{marginTop: "100px"}}>
            <h1>Admin</h1>
            <div className="accordion" id="accordionExample">
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                            <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
                                    data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Cakes List
                            </button>
                        </h2>
                    </div>

                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne"
                         data-parent="#accordionExample">
                        <div className="row col-md-12">
                            {
                                cakes.map((each, index) => {
                                    return (
                                        <Cake data={each} key={index} page="admin"/>
                                    )
                                })
                            }
                            <>
                                { isLoading && <div>Loading....</div>}
                            </>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                            <button className="btn btn-link btn-block text-left collapsed" type="button"
                                    data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false"
                                    aria-controls="collapseTwo">
                                Add Cake
                            </button>
                        </h2>
                    </div>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                         data-parent="#accordionExample">
                        <div className="card-body">
                            <form onSubmit={submitCake}>
                                <div className="form-group cake_image">
                                    <input type="file" name='cake_image' onChange={fileUpload} className="form-control" placeholder="Cake Image"/>
                                    {cakeImage && <img src={cakeImage} alt="Cake" style={{width: '20%'}}/> }
                                </div>
                                <div className="form-group cake_name">
                                    <input value={cakeName} name='cake_name' onChange={e => setCakeName(e.target.value)} className="form-control" placeholder="Cake Name"/>
                                </div>
                                <div className="form-group cake_desc">
                                    <input value={cakeDesc} name='cake_desc' onChange={e => setCakeDesc(e.target.value)} className="form-control" placeholder="Cake Description"/>
                                </div>
                                <div className="form-group cake_price">
                                    <input value={cakePrice} name='cake_price' onChange={e => setCakePrice(e.target.value)} className="form-control" placeholder="Cake Price"/>
                                </div>
                                <div className="form-group cake_weight">
                                    <input value={cakeWeight} name='cake_weight' onChange={e => setCakeWeight(e.target.value)} className="form-control" placeholder="Cake Weight"/>
                                </div>
                                <div className="form-group cake_type">
                                    <select name="cake_type" value={cakeType} onChange={e => setCakeType(e.target.value)} className="form-control">
                                        <option value="" disabled>Select Type</option>
                                        <option value="birthday">Birthday</option>
                                        <option value="anniversary">Anniversary</option>
                                        <option value="farewell">Farewell</option>
                                    </select>
                                </div>
                                <div className="form-group cake_eggless">
                                    <input type="checkbox" id="cake_eggless" value={cakeEggless} name='cake_eggless' onChange={e => setCakeEggless(e.target.checked)} className="form-control"/>
                                    <label htmlFor="cake_eggless">Eggless</label>
                                </div>
                                <div className="form-group cake_flavour">
                                    <input value={cakeFlavour} name='cake_flavour' onChange={e => setCakeFlavour(e.target.value)} className="form-control" placeholder="Cake Flavour"/>
                                </div>
                                <div className="form-group cake_flavour">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <button type="button" className="btn btn-success" onClick={handleAdd}>
                                                <span>
                                                    <FontAwesomeIcon icon="plus"/>
                                                </span>
                                            </button>
                                        </div>
                                        <div className="col-md-9">
                                            {
                                                fields.map((each, index) => {
                                                    return (
                                                        <div className="row col-md-12" key={`${each}-${index}`}>
                                                            <div className="col-md-9">
                                                                <input name='cake_ingredients' onChange={e => handleChange(index, e)} className="form-control" placeholder="Cake Ingredients"/>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <button type="button" className="btn btn-danger" onClick={ () => handleRemove(index)}>
                                                                    <span>
                                                                        <FontAwesomeIcon icon="minus"/>
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-success" style={{float: "right"}}>
                                    <span>
                                        <FontAwesomeIcon icon="arrow-right"/>
                                    </span>
                                    &nbsp;&nbsp;&nbsp;Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default (withRouter(Admin))