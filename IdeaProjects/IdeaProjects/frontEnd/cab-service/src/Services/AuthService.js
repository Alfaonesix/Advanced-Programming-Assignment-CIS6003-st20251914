import axios from "axios";

const AUTH_BASE_API = "http://localhost:7000/api/auth/";

const userLoginService = async(username, password) => {
    console.log("User Login Details => ", username , password);
    const response = await axios.post(AUTH_BASE_API + 'signin', {username, password});
    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    console.log(response.data)
    return response.data
}

const creatNewUser = async (username, address, email, phone, gender, password) => {
    console.log("user details=> :", {username, address, email, phone, gender, password});
    return await axios.post(AUTH_BASE_API+ "signup", {username, address, email, phone, gender, password});
}

const dashboardLoginService = async(username, password) => {
    console.log("User Login Details => ", username + password);
    const response = await axios.post(AUTH_BASE_API + 'driver/signin', {username, password});
    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data
}
const getCurrentUser=()=> {
    return JSON.parse(localStorage.getItem("user"));
}
const getCurrentDriver =() => {
    return JSON.parse(localStorage.getItem("driver"));
}

const creatNewDriver = async (driver) => {
    console.log("driver Detaisl => :", driver);
    return await axios.post(AUTH_BASE_API + "driver/signup", driver);
}
const updateDriver= async(id, Driver) => {
    console.log("driver Detaisl => :", id);
    return axios.put(AUTH_BASE_API + 'driver/'+ id, Driver);
}

const AuthServices = {
    userLoginService,
    creatNewUser,
    getCurrentUser,
    dashboardLoginService,
    creatNewDriver,
    updateDriver,
    getCurrentDriver
}

export default AuthServices;