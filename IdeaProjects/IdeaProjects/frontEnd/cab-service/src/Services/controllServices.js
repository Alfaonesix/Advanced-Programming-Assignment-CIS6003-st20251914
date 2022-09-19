import axios from "axios";

const BASE_API = "http://localhost:7000/api/test";

const getAllDrivers = () => {
    return axios.get(BASE_API + "/driver");
}

const getAllOrders = () => {
    return axios.get(BASE_API + "/AllOrders");
}
const getDriverById =(id)=> {
    return axios.get(BASE_API +"/driver/" + id);
}
const getDriverByBranch = (branchId) => {
    return axios.get(BASE_API + "/driverByBranch/" + branchId );
}

const findDriverById = async (id) => {
    return axios.get(BASE_API + '/driver/' + id);
}

const addNewBook = async (book) => {
    return await axios.post(BASE_API + "/buy-now", book);
}
const getBooksDoneByUser = async (branch) => {
    return await axios.get(BASE_API + "/findOrderByBranch/" +  branch);
}
const getBookById = async (id) => {
    return await axios.get(BASE_API + '/orders/' +id);
}

const getUserBooksById = async (id) => {
    return await axios.get(BASE_API + "/userorders/" + id);
}

const getDriverOrders = async (driver) => {
    console.log(driver);
    return await axios.get(BASE_API + "/driverOrder/" + driver);
}
const deleteDriver=(id)=> {
    return axios.delete(BASE_API+ '/driver/' + id);
}

const confirmOrder= async(id, Orders) => {
    console.log("order Detaisl => :", id);
    console.log("order Detaisl => : "+ Orders.branch);
    return axios.put(BASE_API + '/orders/'+ id, Orders);
}

const getOrderById = async(id) => {
    return await axios.get(BASE_API+ '/orders/' +id);
}

const ControllServices = {
    getAllDrivers,
    getDriverById,
    getDriverByBranch,
    findDriverById,
    addNewBook,
    getBooksDoneByUser,
    getBookById,
    getUserBooksById,
    getAllOrders,
    getDriverOrders,
    deleteDriver,
    confirmOrder,
    getOrderById
}

export default ControllServices;