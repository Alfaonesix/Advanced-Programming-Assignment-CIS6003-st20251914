import React, {useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthServices from "../../Services/AuthService";

const required = (value) => {
    if (!value) {
        return (
            <div className="invalid-feedback d-block">
                this field id required
            </div>
        );
    }
};

const EmployeeLogin =() => {
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
            AuthServices.dashboardLoginService(username, password).
                    then(() => {
                        navigate.push("/dashboard");
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
    };

    return (
        <div className="col-md-12" >
            <div className="Customercard card-container">
                <h1 className="text-center mb-1 text-light">Admin Panel</h1>
                <h2 className="text-center mb-3 text-light">LOGIN</h2>
                <img
                src="https://img.icons8.com/external-bearicons-outline-color-bearicons/100/000000/external-user-essential-collection-bearicons-outline-color-bearicons.png"
                alt="profile-img"
                className="profile-img-card"
                />
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

export default EmployeeLogin;