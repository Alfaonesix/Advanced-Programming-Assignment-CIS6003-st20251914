import React, { Component } from "react";

class AllOrdersview extends Component {
    render() {
        return (
            <div className="card btn">
                <a href="/All-booking/" className="btn btn-fix">
                    <div className="box-part text-center">
                        <img className="image mb-2" style={{width:'42px' ,height:'42px'}} src="https://image.shutterstock.com/image-vector/taxi-sign-silhouette-travel-illustration-260nw-120738667.jpg"/>
                        <div className="title">
                            <h2>AllOrders</h2>
                            <h3>View</h3>
                        </div>
                    </div>
                </a>
            </div>
        ); 
    }
}

export default AllOrdersview;