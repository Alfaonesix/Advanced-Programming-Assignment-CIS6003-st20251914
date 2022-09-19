import React, { Component } from "react";
import AuthServices from "../../../Services/AuthService";
import ControllServices from "../../../Services/controllServices";

class DriverBook extends Component {
    constructor(props){
        super(props)

        this.state = {
            orders : [],
            driver:"",
            vehicle: "",
            img: "",
            userid: "",
            destination: "",
            branch:"",
            state: "",
            date: "",
            user :  localStorage.getItem("user"),
            id: "",
        }
    };

    componentDidMount() {
        console.log(AuthServices.getCurrentUser().username);
    
        ControllServices.getDriverOrders(AuthServices.getCurrentUser().username).then((res) => {
            this.setState({
                orders: res.data
            });
        });
    }

    getdriverState(id){
        ControllServices.getOrderById(id).then((res)=> {
            let details1 = res.data;
            this.setState({
                branch: details1.branch,
                date: details1.date,
                destination: details1.destination,
                driver: details1.driver,
                img: details1.img,
                state: details1.state,
                user: details1.user,
                userid: details1.userid,
                vehicle: details1.vehicle,
                id: details1.id
            });
        });
    }


    updateOrder(id, value) {
        console.log(id, value);
        console.log("Brnach => "+ this.state.branch);
        let orders = {
            branch: this.state.branch,
            date: this.state.branch,
            destination: this.state.destination,
            driver: this.state.driver,
            img: this.state.img,
            state: value,
            user: this.state.user,
            userid: this.state.userid,
            vehicle: this.state.vehicle
        }
        ControllServices.confirmOrder(id,orders).then((res) =>{
            
        })
    }

    render() {
        return(
            <div>
              
                <div className="box-part text-center">
                    <div className="card-title mb-3">
                        <h2>Driver's</h2>
                        <h4>Books</h4>
                    </div> 
                    <hr class="dashed"></hr>

                <div className="container">
                    <table class="table table-hover table-dark">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Destination</th>
                                <th scope="col">Customer Location</th>
                                <th scope="col">Date</th>
                                <th scope="col">State</th>

                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.orders.map( orders => 
                                <tr key={orders.driver} onMouseOver={()=>this.getdriverState(orders.id)}>
                                    <td>{orders.id}</td>
                                    <td>{orders.user}</td>
                                    <td>{orders.destination}</td>
                                    <td>{orders.branch}</td>
                                    <td>{orders.date}</td> 
                                    <td>{orders.state}</td>
                                    <td>
                                    <button className='btn btn-primary btn-sm' onClick={() =>this.updateOrder(orders.id,"Comfirm")}>
                                   Comfirm
                                    </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>   
            </div>
        </div>
        );
    }
}

export default DriverBook;