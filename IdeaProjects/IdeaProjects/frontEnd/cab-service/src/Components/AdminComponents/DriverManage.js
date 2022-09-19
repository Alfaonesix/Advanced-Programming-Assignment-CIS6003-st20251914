import React, { Component } from "react";

class DriverManage extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className='card'>
                <a href='/DriverManagmentPage/' className='btn btn-fix'>
                <div className="box-part text-center">
                <img className='image mb-2' src="https://img.icons8.com/color/64/000000/insurance-agent-skin-type-3.png"></img>
                    <div className="title">
                        <h3>Driver</h3>
                        <h4>Managment</h4>
                    </div>
                </div>
                </a>
            </div>
        );
    }
}

export default DriverManage;