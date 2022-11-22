import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import ProductsList from "./Components/ProductsList";
import Signup from "./Components/Signup";
import NavBar from "./Components/NavBar";
import LoginDetails from "./Components/LoginDetails";

function App() {
  return (
    <div>
      <NavBar />
      <div>
        <br /> <br />
        <Routes>
          <Route exact path={"/"} element={<ProductsList />} />
          <Route exact path={"/login"} element={<Login />} />
          <Route exact path={"/signup"} element={<Signup />} />
          <Route exact path={"logindetails"} element={<LoginDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
