import React, { Component} from "react";
import AuthServices from "../../Services/AuthService";
import NavBar from "./NavBar";


class UserProfile extends Component {
render() {
    return (
        <div>
            <NavBar/>
            <div className="container">
                <h2>MY Books</h2>
                <hr/>
               
                   <div className="card mb-2">
                    <div className="card-body">
                        <div className="row">
                        <div className='col-3 align-self-start'>
                            <h1 className="card-title text-left"> Username:- {AuthServices.getCurrentUser().username}</h1>
                            <p>Address:- {AuthServices.getCurrentUser().address}</p>
                            <strong>email</strong><br/>
                            <p>{AuthServices.getCurrentUser().email}</p>                               
                        </div>
                        </div>

                    </div>
                    <div className="card-footer text-muted">
                        <p><strong>Phone Number: </strong> {AuthServices.getCurrentUser().gender}</p>
                    </div>
                   </div> 
 
            </div>
        </div>
    );
}
}

export default UserProfile;