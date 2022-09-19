import React, { Component } from "react";
import AuthServices from "../../Services/AuthService";
import ControllServices from "../../Services/controllServices";
import NavBar from "./NavBar";

class HomePage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            Drivers: [],
            branchID: "1",
            role: AuthServices.getCurrentUser().roles[0],
        }
    };

    onChangeValue(event){
        this.setState({
            branchID: event.target.value
        })
    }

    componentDidUpdate() {
        ControllServices.getDriverByBranch(this.state.branchID).then((res) => {
            this.setState({
                Drivers: res.data
            });
        });
    }

    componentDidMount() {
        ControllServices.getDriverByBranch(this.state.branchID).then((res) => {
            this.setState({
                Drivers: res.data
            });
        });
    }
    buyNow(id){
        this.props.history.push('/book-cabs/'+ id);
    }
    
   
    render() {
        return(
            <div>
                <NavBar/>
                <div style={{justifyContent: "center", paddingLeft:"5%", paddingRight:"5%"}}>
                    <div id="carouselExampleIndicators" className="carousel slide mt-1" style={{marginBottom: "2%"}} data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active" style={{height:"400px"}}>
                            <img src="https://img.freepik.com/premium-vector/taxi-service-online-concept-taxi-service-application-mobile_68971-369.jpg?w=2000" class="d-block w-100" alt="..."/>
                            </div>
                            <div className="carousel-item">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjJMJ7UDehf7h8_N4mvlgiPoV0EIz2YVBvBCYaUS-yYyRuR2bs3tXp9lXwt38GD7nXlUI&usqp=CAU" class="d-block w-100" alt="..."/>
                            </div>
                            <div className="carousel-item">
                            <img src="..." class="d-block w-100" alt="..."/>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                <div className="row" style={{justifyContent: "center", paddingLeft:"5%", paddingRight:"5%"}}>
                    <div className="col align-items-center text-end">
                        <span>Select Branch</span>
                    </div>
                    <div className='col-2' style={{marginBottom:"1%"}}>
                    <select class="form-select" as="select" custom onChange={this.onChangeValue.bind(this)} aria-label="Default select example">
                        <option value="7" selected>Colombo</option>
                        <option value="1">Galle</option>
                        <option value="2">Kandy</option>
                        <option value="3">Nugegoda</option>
                        <option value="4">Gampaha</option>
                        <option value="5">Kurunegala</option>
                        <option value="6">Jaffna</option>
                      
                    </select>
                    </div>
                    <hr></hr>
                </div>

                <div  style={{justifyContent: "center", paddingLeft:"5%", paddingRight:"5%"}}>
                    { this.state.Drivers.map( Drivers => 
                    <div className="card m-1" key={Drivers.id} style={{ display: "inline-block"}}>
                            <img src={Drivers.vehicletype} alt="Card image cap" class="img-thumbnail" style={{width:"300px", height: "250px"}}/>
                        <div className="card-body">
                            <strong className="card-text">{Drivers.username.substring(0, 22)}</strong><br/>
                            <p className="card-text">VehicleType : {Drivers.vehiclename} /=</p>
                        </div>
                        <button className='btn bg-dark text-light m-2' onClick={() =>this.buyNow(Drivers.id) } >Book</button>
                    </div>
                    )}
                </div>
            </div>
        );
    }
}

export default HomePage;