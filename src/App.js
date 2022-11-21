import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path={"/login"} element={<Login />} />
        <Route exact path={"/signup"} element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
