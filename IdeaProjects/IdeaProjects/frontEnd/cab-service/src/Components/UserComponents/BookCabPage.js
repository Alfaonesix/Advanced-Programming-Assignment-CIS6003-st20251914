import React, { Component } from "react";
import AuthServices from "../../Services/AuthService";
import ControllServices from "../../Services/controllServices";
import NavBar from "./NavBar";

class BookCabPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            driver: [],
            driver:"",
            vehicle: "",
            img: "",
            userid: "",
            user: "",
            destination: "",
            branch:"",
            state: "pending",
            date: new Date().toLocaleString(),
            success: false,
            confirmedby: "",
            message: ""
        }
        this.bookingValueHandler = this.bookingValueHandler.bind(this);
        this.changeDestinationHandler = this.changeDestinationHandler.bind(this);
    }
    componentDidMount(){
        ControllServices.findDriverById(this.state.id).then((res) => {
            this.setState({
                driver: res.data
            });
           console.log("Address=> " + AuthServices.getCurrentUser().address)
        });
    }

    bookingValueHandler = (event) => { this.setState({bookvalue: event.target.value});}
    changeDestinationHandler = (event)=> {
        this.setState({destination: event.target.value});
    }
    
    addBook = (e) => {
        e.preventDefault();
        let book = {
            driver: this.state.driver.username,
            vehicle: this.state.driver.vehiclename,
            img: this.state.driver.vehicletype,
            userid: AuthServices.getCurrentUser().id,
            user: AuthServices.getCurrentUser().username,
            destination: this.state.destination,
            branch: AuthServices.getCurrentUser().address,
            state: this.state.state,
            date: this.state.date
        }
        ControllServices.addNewBook(book).then((res) => {
            this.setState({
                success: true,
                message: res.data.message,
            });
        },(error) => {
            const resMessage = 
            (error.res &&
              error.res.data &&
              error.res.data.message) ||
              error.toString();
              this.setState({
                message: resMessage,
              });
        },
        );
    }

    render() {
        return (
            <div>
                <NavBar/>
                <div className="container">
                    <div className="row">
                        <div className="card mt-5 shadow-lg">

                            <div className="card-header"><h2>{this.state.driver.vehiclename}</h2></div>
                            

                            <div className="card-body">
                                <div className="col">
                                    <div className="row">
                                        <div className="col-3">
                                            <img src={this.state.driver.vehicletype} alt="No Image" class="img-thumbnail" style={{width:"300px", height: "300px", backgroundColor:"gray"}}/>
                                        </div>
                                        <div className="col-3">
                                            <span className="mt-3">{this.state.driver.username}</span><br/>
                                            <span className="text-danger" style={{marginLeft: "0%"}}>Driver Phone {this.state.driver.phone}</span>

                                            <div className="form-inline mt-2">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">Destination</span>
                                                    </div>
                                                    <input type="text" className="form-control" placeholder="Enter Destination" name="destination"
                                                    value={this.state.destination} onChange={this.changeDestinationHandler} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-3">

                                        </div>

                                        <div className="col">
                                            <strong>Customer Details:</strong>
                                            <span style={{paddingLeft: "0%"}}>{AuthServices.getCurrentUser().username},<br/></span>
                                            <span style={{paddingLeft: "23%"}}>{AuthServices.getCurrentUser().email}</span>
                                            <span className="mt-4"><strong>Book From: </strong> {AuthServices.getCurrentUser().address}</span>
                                            <hr></hr>
                                            <div className="row mt-4">
                                                <button className="btn btn-success mt-1 mb-3" onClick={this.addBook} >Book Now</button>

                                                {this.state.message && (
                                                    <div className= {this.state.success ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                        {this.state.message}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
 
        );
    }
}

export default BookCabPage;