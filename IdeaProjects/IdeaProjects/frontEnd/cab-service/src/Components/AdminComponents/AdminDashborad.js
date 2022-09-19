import React, { useEffect, useState } from "react";
import AuthServices from "../../Services/AuthService";
import AdminAndDriverNavBar from "../AdminAndDriverNavBar";
import DriverManage from "../AdminComponents/DriverManage";
import OrderManage from "./Orderview";
import ProfileCard from "../ProfileCard";
import AllOrders from "./pages/AllOrders";
import AllOrdersview from "./pages/AllOrdersview";

const AdminDashBoard = () => {
    const [admin, setAdmin] = useState(false);
    const [driver, setDriver] = useState(false);

    useEffect(() => {AuthServices.getCurrentUser().roles.forEach(role => {
        if(role==="ROLE_ADMIN") {
            console.log("admin");
            setAdmin(true);
            setDriver(false);
        }else{
            console.log("driver");
            setAdmin(false);
            setDriver(true);
        }
    });
});

return (
    <div>
        <AdminAndDriverNavBar/>
        <div className="row">
            <div className="col">
                {admin ? (
                <div className="row m-1 mt-5">
                    <div className="col-4"><DriverManage/></div>
                    <div className="col-4"><AllOrdersview/></div>
                </div>
                ):
                <div className="row m-1 mt-3">
                    <div className="col-6"><OrderManage/></div>
                </div>
             }
            </div>
            <div className="col-3">
                <div>
                    <ProfileCard/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default AdminDashBoard;

