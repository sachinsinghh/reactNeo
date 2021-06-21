import {Component} from "react";
import logo1 from '../images/cakes.jpg';
import logo2 from '../images/cakes_2.jpg';

class Carousel extends Component {
    render() {
        return (
           
            <div>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img style={{ height: "25rem",padding:"0 0.1%" }} className="d-block w-100" src="https://nepaleasyshopping.com/public/images/advertise/1598374548_cake%204.jpg"
                    alt="First slide"></img>
                </div>
                <div className="carousel-item">
                  <img style={{ height: "25rem",padding:"0 0.1%" }}  className="d-block w-100" src="https://i1.wp.com/www.frugalfeeds.com.au/wp-content/uploads/2016/06/Lindt-Lava-Cake.png"
                    alt="Second slide"></img>
                </div>
          
              </div>
              <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        )
    }
}

export default Carousel;