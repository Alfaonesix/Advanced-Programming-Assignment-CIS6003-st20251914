import React, { Component } from "react";
import AuthServices from "../../Services/AuthService";
import ControllServices from "../../Services/controllServices";
import NavBar from "./NavBar";

class MyBooks extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: []
        }
    };

    componentDidMount() {
        ControllServices.getUserBooksById(AuthServices.getCurrentUser().id).then((response) => {
            this.setState({
                orders: response.data
            });
        });
    }

    render() {
        return (
            <div>
                <NavBar/>
                <div className="container">
                    <h2>MY Books</h2>
                    <hr/>
                    {this.state.orders.map(orders =>
                       <div className="card mb-2" key={orders.user}>
                        <div className="card-body">
                            <div className="row">
                            <div className='col-2'>
                                <img src={orders.img} class="img-thumbnail" style={{width:"200px", height: "200px", backgroundColor:"gray"}}/>
                            </div>

                            <div className='col-3 align-self-start'>
                                <h5 className="card-title text-left">{orders.driver}</h5>
                                <p>{orders.destination}</p>
                                <strong>Order status:</strong><br/>
                                <p>{orders.state}</p>                               
                            </div>

                           
                            </div>

                        </div>
                        <div className="card-footer text-muted">
                            <p><strong>Date: </strong> {orders.date}</p>
                        </div>
                       </div> 
                    
                    )}


                </div>
            </div>
        );
    }
}

export default MyBooks;