import React, { Component } from "react";
import ControllServices from "../../../Services/controllServices";

class AllOrders extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: []
        }
}

componentDidMount() {
    ControllServices.getAllOrders().then((res) => {
        this.setState({
            orders: res.data
        });
    });
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
                            <th scope="col">Driver Name</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Destination</th>
                            <th scope="col">Customer Location</th>
                            <th scope="col">Date</th>
                            <th scope="col">State</th>

                           
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orders.map( orders => 
                            <tr key={orders.id}>
                                <td>{orders.id}</td>
                                <td>{orders.driver}</td>
                                <td>{orders.user}</td>
                                <td>{orders.destination}</td>
                                <td>{orders.branch}</td>
                                <td>{orders.date}</td> 
                                <td>{orders.state}</td>
                               
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

export default AllOrders;