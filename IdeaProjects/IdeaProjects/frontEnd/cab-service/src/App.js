import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserLogin from './Components/UserComponents/UserLoginPage';
import HomePage from './Components/UserComponents/HomePage';
import EmployeeLogin from './Components/AdminComponents/EmployeeLogin';
import AdminDashBoard from './Components/AdminComponents/AdminDashborad';
import UserRegistration from './Components/UserComponents/UserRegistrationPage';
import React from 'react';
import './App.css';
import DriverManagmentpage from './Components/AdminComponents/pages/DriverManagmentpage';
import AddNewDriver from './Components/AdminComponents/pages/AddNewDriver';
import BookCabPage from './Components/UserComponents/BookCabPage';
import MyBooks from './Components/UserComponents/MyBooks';
import updateDriver from './Components/AdminComponents/pages/UpdateDriver';
import DriverBook from './Components/AdminComponents/pages/DriverBook';
import AllOrders from './Components/AdminComponents/pages/AllOrders';
import UserProfile from './Components/UserComponents/User-Profile';

function App() {
  return (
    <div>
      <Router>
        <Switch>
        <Route path='/' exact component={UserLogin}></Route>
        <Route path='/user-login' exact component={UserLogin}></Route>
        <Route path='/dashboard-login' exact component={EmployeeLogin}></Route>
        <Route path='/home' component={HomePage}></Route>
        <Route path='/dashboard' component={AdminDashBoard}></Route>
        <Route path={'/user-register'} component={UserRegistration}></Route>
        <Route path={'/driver-manage/'} component={DriverManagmentpage}></Route>
        <Route path='/add-new-driver/_add' component={AddNewDriver}></Route>
        <Route path='/DriverManagmentPage/' component={DriverManagmentpage}></Route>
        <Route path={"/book-cabs/:id"} component={BookCabPage}></Route>
        <Route path={'/my-orders'} component={MyBooks}></Route>
        <Route path={'/updateDriver/:id'} component={updateDriver}></Route>
        <Route path={"/order-view"} component={DriverBook}></Route>
        <Route path={'/All-booking/'} component={AllOrders}></Route>
        <Route path={'/user-profile'} component={UserProfile}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
