import React, { Component } from "react";
import AuthServices from "../../../Services/AuthService";
import ControllServices from "../../../Services/controllServices";

class updateDriver extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            username: "",
            email: "",
            phone: "",
            vehiclename: "",
            vehicletype: "",
          
            success: false,
            message: "",
        }

        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changeEmaileHandler = this.changeEmaileHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.changeVehiclenameHandler = this.changeVehiclenameHandler.bind(this);
        this.changevehicleTypeHandler = this.changevehicleTypeHandler.bind(this);
       
    }

    componentDidMount () {
       
        ControllServices.findDriverById(this.state.id).then((res) => {

            if(res.data){
                console.log("Response Data: " + res.data);
            }else{
                console.log("No response");
            }
           
            let Drivers = res.data;
            this.setState({
                username: Drivers.username,
                email: Drivers.email,
                phone: Drivers.phone,
                vehiclename: Drivers.vehiclename,
                vehicletype: Drivers.vehicletype,
               
        });
    });
}

updateDriver = (e) => {
    e.preventDefault();
    let Drivers = {
        username: this.state.username,
        email: this.state.email,
        phone: this.state.phone,
        vehiclename: this.state.vehiclename,
        vehicletype: this.state.vehicletype,
       
    };
    AuthServices.updateDriver(this.state.id,Drivers).then((response) =>
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

render() {
    return(
        <div>
        {/* <AdminAndDriverNavBar/> */}
     <div className="container">
    <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3 mt-3 shadow-lg">
           
            <hr/>
            <div children="card-body mt-3">
            <h2 className="text-center" style={{fontFamily:"fantasy"}}>Update Drivers</h2>
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


                    <button className='btn btn-success mt-3 mb-2' onClick={this.updateDriver}>Save</button>
                    {/* <button className='btn btn-danger mt-3 mb-2' onClick={this.cancel.bind(this)} style={{marginLeft: "10px" }}>Cancel</button> */}
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

export default updateDriver;
