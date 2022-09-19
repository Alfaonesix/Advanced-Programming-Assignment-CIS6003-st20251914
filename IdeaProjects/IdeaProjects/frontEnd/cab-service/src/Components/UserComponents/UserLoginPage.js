import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useHistory } from "react-router-dom";
import AuthServices from "../../Services/AuthService";

const required = (value) => {
    if (!value) {
        return (
            <div className="invalid-feedback d-block">
                This field is required!
            </div>
        );
    }
};

const UserLogin = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useHistory();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };  

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        form.current.validateAll();
        if(checkBtn.current.context._errors.length === 0){
            console.log('userLogin => '+ JSON.stringify(password, username));
            AuthServices.userLoginService(username, password).then(() => {
                        navigate.push("/home");
                        window.location.reload();
                    },
                    (error) => {
                        const resMessage =
                            (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();
                            setLoading(false);
                            setMessage(resMessage);
                        }
                    );
        }else{
            setLoading(false);
        }
    }

    return (
        <div className="col-md-12">
            <div className="Customercard card-container">
                <h1 className="text-center mb-1"><b>GO CHEETA</b></h1>
                <h2 className="text-center mb-3">Sign in here</h2>
                <hr/>
                <img src="https://vasoft.co.in/assets/images/profile.png"
                alt="profile-img"
                className="profile-img-card"
                />
                <hr/>
                <Form onSubmit={handleLogin} ref={form}>
                    <div className="form-group mb-3">
                        <label className="mb-1" htmlFor="username">Username</label>
                        <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required]}
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label className="mb-1" htmlFor="password">Password</label>
                        <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Login</span>
                        </button>
                    </div>
                    <a className="btn btn-fix" href="/user-register">New User? Signup form here</a>
                    {message && (
                        <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );
}

export default UserLogin;