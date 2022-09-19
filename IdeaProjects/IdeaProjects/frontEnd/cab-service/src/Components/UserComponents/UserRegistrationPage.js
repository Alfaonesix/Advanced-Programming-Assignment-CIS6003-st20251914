import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useHistory } from "react-router-dom";
import { isEmail } from "validator";
import AuthServices from "../../Services/AuthService";

const required = (value) => {
    if(!value) {
        return(
            <div className="invalid-feedback d-block">
                this field is required!
            </div>
        );
    }
};
const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="invalid-feedback d-block">
                this is not a valid email.
            </div>
        );
    }
};
const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
          <div className="invalid-feedback d-block">
            The password must be between 3 and 20 characters.
          </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
          <div className="invalid-feedback d-block">
            The password must be between 6 and 40 characters.
          </div>
        );
    }
};

const UserRegistration = () =>{

    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useHistory();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    const onChangeAdress = (e) => {
        const address = e.target.value;
        setAddress(address);
    }
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const onChangeGender = (e) => {
        const gender = e.target.value;
        setGender(gender);
    }
    const onChangePhone = (e) => {
        const phone = e.target.value;
        setPhone(phone);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);

        form.current.validateAll();
            if (checkBtn.current.context._errors.length === 0) {
            AuthServices.creatNewUser(username, address, email, gender, phone, password).then(
                (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                setTimeout(()=>navigate.push('/user-login'), 1000) ;
                },
                (error) => {
                const resMessage =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
                setSuccessful(false);

                }
            );
        }
};
return(
    <div className="col-md-12">
        <div className="Customercard card-container">
        <h1 className="text-center mb-1 "><b>GO CHEETA</b></h1>
            <h2 className="text-center mb-3 ">Register from here</h2>
            <hr/>
            <img
                src="https://ps.w.org/userswp/assets/icon-256x256.png?rev=2183166"
                alt="profile-img"
                className="profile-img-card"
            />
            <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
                <div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required, vusername]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <Input
                        type="text"
                        className="form-control"
                        name="address"
                        value={address}
                        onChange={onChangeAdress}
                        validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        validations={[required, validEmail]}
                        />
                    </div>
                   
                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <Input
                        type="text"
                        className="form-control"
                        name="gender"
                        value={gender}
                        onChange={onChangeGender}
                        validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">phone</label>
                        <Input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={phone}
                        onChange={onChangePhone}
                        validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required, vpassword]}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <button className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                    <a className="btn btn-fix" href="/user-login">Alredy Registerd ?</a>
                </div>
            )}
            {message && (
                <div className="form-group">
                <div
                    className={
                    successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                >
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
export default UserRegistration;