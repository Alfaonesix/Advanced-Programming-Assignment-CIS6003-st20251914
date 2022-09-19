import React, { Component } from "react";
import ControllServices from "../../../Services/controllServices";
import AdminAndDriverNavBar from "../../AdminAndDriverNavBar";

class DriverManagmentpage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Drivers: []
        }
        this.updateDriver = this.updateDriver.bind(this);
    };

    componentDidMount() {
        ControllServices.getAllDrivers().then((res) => {
            this.setState({
                Drivers: res.data
            });
        });
    }

    deleteDriver(id) {
        ControllServices.deleteDriver(id).then(res => {
            this.setState({Drivers: this.state.Drivers.filter(driver=> driver.id !==id)});
        });
    }

    updateDriver(id){
        this.props.history.push("/updateDriver/"+ id);
    }

    render() {
        return (
            <div>
                <AdminAndDriverNavBar/>
                <div className="box-part text-center">
                    <div className="card-title mb-3">
                        <h2>Drivers</h2>
                        <h4>Managment</h4>
                    </div>   
                </div>

                <hr class="dashed"></hr>
                <div className="container">
                   <div className="row  mb-4">
                   <a href='/add-new-driver/_add' className='btn btn-fix'>
                        <div className="col-6 col-sm-3">
                            <div className="card shadow-lg">
                            <div className="box-part text-center">
                                <img className='image mb-2' src="https://img.icons8.com/color/48/000000/add-user-male--v1.png"></img>
                                    <div class="title">
                                        <h5>Add New Driver</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                   </a>
                    </div>    

                    <table class="table table-hover table-dark">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">vehicle Img</th>
                                <th scope="col">Driver Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone number</th>
                                <th scope="col">vehicale name</th>

                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Drivers.map( Drivers => 
                                <tr key={Drivers.id}>
                                    <td>{Drivers.id}</td>
                                    <td><img src={Drivers.vehicletype} style={{width:"100px"}}/></td>
                                    <td>{Drivers.username}</td>
                                    <td>{Drivers.email}</td>
                                    <td>{Drivers.phone}</td> 
                                    <td>{Drivers.vehiclename}</td>

                                    <td>
                                    <button className='btn btn-primary btn-sm' onClick={ () => this.updateDriver(Drivers.id)}>
                                    <img src="https://img.icons8.com/material-rounded/20/ffffff/edit--v1.png"/>
                                    </button>
                                    <button className='btn btn-warning btn-sm' style={{marginLeft:"25px"}}>
                                    <img src="https://img.icons8.com/ios-glyphs/20/ffffff/view-file.png"/>
                                    </button>
                                    <button className='btn btn-danger btn-sm' onClick={ () => this.deleteDriver(Drivers.id)} style={{marginLeft:"25px"}}>
                                    <img src="https://img.icons8.com/external-kosonicon-solid-kosonicon/20/ffffff/external-bin-cleaning-kosonicon-solid-kosonicon.png"/>
                                    </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div> 
            </div>
        );
    }
}

export default DriverManagmentpage;