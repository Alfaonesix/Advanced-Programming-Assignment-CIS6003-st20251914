import React from "react";

const AdminAndDriverNavBar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-2 mb-3">
            <a class="navbar-brand" href="#"style={{color:"yellow"}}>GO CHEETA</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-item nav-link active" href="/dashboard">Dashboard </a>
            </div>
        </div>
        </nav>
    );
}

export default AdminAndDriverNavBar;