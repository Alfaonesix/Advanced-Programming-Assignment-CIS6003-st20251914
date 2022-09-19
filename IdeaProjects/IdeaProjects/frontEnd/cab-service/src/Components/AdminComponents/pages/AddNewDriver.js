import React, { Component } from "react";
import AuthServices from "../../../Services/AuthService";
import ControllServices from "../../../Services/controllServices";
// import AdminAndDriverNavBar from "../AdminAndDriverNavBar";


class AddNewDriver extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            phone: "",
            vehiclename: "",
            vehicletype: "",
            roles:['driver'],
            branches: [''],
            password: "",
            success: false,
            message: "",
        }

        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changevehicleTypeHandler = this.changevehicleTypeHandler.bind(this);
        this.changeEmaileHandler = this.changeEmaileHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.changeVehiclenameHandler = this.changeVehiclenameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeBranchHandler = this.changeBranchHandler.bind(this);
    }

    componentDidMount() {
            ControllServices.getDriverById(this.state.id).
                 then( (res) => {
                    let driver = res.data;
                    this.setState({
                        username: driver.username,
                        email: driver.email,
                        phone: driver.phone,
                        vehiclename: driver.vehiclename,
                        vehicletype: driver.vehicletype,
                        branches: driver.branches,
                        password: driver.password
                    });
                 });
        }
    

    UpdateDriver = (e) => {
        e.preventDefault();
        let driver = {
            username: this.state.username,
            email: this.state.email,
            phone: this.state.phone,
            vehiclename: this.state.vehiclename,
            vehicletype: this.state.vehicletype,
            roles: this.state.roles,
            branches: this.state.branches,
            password: this.state.password
        };
       
            AuthServices.creatNewDriver(driver).then((response) =>
            {
                this.setState({
                    success: true,
                    message: response.data.message,
                });
            },
            (error) => {
                const resMessage = 
                (error.response && 
                 error.response.data &&
                 error.response.data.message) ||
                 error.message ||
                 error.toString();

                 this.setState({
                    message : resMessage
                 });
            }   
            );
        
    }

    changevehicleTypeHandler = (event)=> {
        this.setState({vehicletype: event.target.value});
    }
    changeUsernameHandler = (event)=> {
        this.setState({username: event.target.value});
    }
    changeEmaileHandler = (event)=> {
        this.setState({email: event.target.value});
    }
    changePhoneHandler = (event)=> {
        this.setState({phone: event.target.value});
    }
    changeVehiclenameHandler = (event)=> {
        this.setState({vehiclename: event.target.value});
    }
    changeBranchHandler = (event)=> {
        this.setState({branches: [event.target.value]});
    }
    changePasswordHandler = (event)=> {
        this.setState({password: event.target.value});
    }
    cancel() {
        this.props.history.push('/dashboard');
    }

    

    render() {
        return (
            <div>
                {/* <AdminAndDriverNavBar/> */}
             <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3 mt-3 shadow-lg">
                   
                    <hr/>
                    <div children="card-body mt-3">
                    <h2 className="text-center" style={{fontFamily:"fantasy"}}>Register Drivers</h2>
                        <img src= {this.state.vehicletype} alt="No Image" className="img-thumbnail" style={{width:"100px", height: "100px", backgroundColor:"gray"}}/>
                        <form>
                    
                            <div className="form-group mt-3">
                                <label>vehicletype</label>
                                <input type="text" className="form-control mt-1" placeholder="Your Image Link" name="vehicletype"
                                value={this.state.vehicletype} onChange={this.changevehicleTypeHandler}/>
                            </div>

                            <div className="form-group mt-3">
                                <label>Username</label>
                                <input type="text" className="form-control mt-1" placeholder="Your name" name="username"
                                value={this.state.username} onChange={this.changeUsernameHandler}/>
                            </div>

                            <div className="form-group mt-3">
                                <label>Email</label>
                                <input type="text" className="form-control mt-1" placeholder="Your Email" name="email"
                                value={this.state.email} onChange={this.changeEmaileHandler}/>
                            </div>

                            <div className="form-group mt-3">
                                <label>Phone NO:</label>
                                <input type="text" className="form-control mt-1" placeholder="Your Phone Number" name="phone"
                                value={this.state.phone} onChange={this.changePhoneHandler}/>
                            </div>

                            <div className="form-group mt-3">
                                <label>vehiclename</label>
                                <input className="form-control mt-1" placeholder="Your vehicalname and number" name="vehiclename"
                                value={this.state.vehiclename} onChange={this.changeVehiclenameHandler}/>
                            </div>

                            <div className="form-group mt-3">
                                <label>Branch</label>
                                <input type="text" className="form-control mt-1" placeholder="Branch" name="branch"
                                value={this.state.branches} onChange={this.changeBranchHandler}/>
                            </div>

                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input type="text" className="form-control mt-1" placeholder="Your password" name="password"
                                value={this.state.password} onChange={this.changePasswordHandler}/>
                            </div>

                            <button className='btn btn-success mt-3 mb-2' onClick={this.UpdateDriver}>Save</button>
                            <button className='btn btn-danger mt-3 mb-2' onClick={this.cancel.bind(this)} style={{marginLeft: "10px" }}>Cancel</button>
                        </form>

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
        );
    }
}

export default AddNewDriver;