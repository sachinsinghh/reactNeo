import {Link} from "react-router-dom";

const PageNotFound = (props) => {
    console.log('props not found', props)
    return (
        <div className="container" style={{marginTop: "100px"}}>
            <h1>Requested Page Not Found!</h1>
            <Link to="/"><button className="btn btn-primary">Home</button></Link>
        </div>
    )
}

export default PageNotFound;