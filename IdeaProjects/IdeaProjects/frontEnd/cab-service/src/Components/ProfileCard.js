import React from "react";
import AuthServices from "../Services/AuthService";

const ProfileCard = () => {
    return (
        <div>
            <div className="card-body shadow-lg">
                <h1>Hello {AuthServices.getCurrentUser().username}</h1>
                <h2>Branch:- {AuthServices.getCurrentUser().branches}</h2>
            </div>
        </div>
    );
}

export default ProfileCard;