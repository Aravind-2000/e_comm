import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import ProductsList from "./Components/ProductsList";
import Signup from "./Components/Signup";
import LoginDetails from "./Components/LoginDetails";
import ResponsiveAppBar from "./Components/AppBar";
import MyCart from "./Components/MyCart";
import AdminSignup from "./Components/Admin/AdminSignup";
import Checkout from "./Components/Checkout";

function App() {
  return (
    <div>
      <ResponsiveAppBar />
      <div>
        <br /> <br />
        <Routes>
          <Route exact path={"/products"} element={<ProductsList />} />
          <Route exact path={"/login"} element={<Login />} />
          <Route exact path={"/signup"} element={<Signup />} />
          <Route exact path={"/adminsignup"} element={<AdminSignup />} />
          <Route exact path={"logindetails"} element={<LoginDetails />} />
          <Route exact path={"/mycart"} element={<MyCart />} />
          <Route exact path={"/checkout"} element={<Checkout />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
