import React, { useState } from "react";
import { Paper, Button } from "@mui/material";
import { Modal } from "react-bootstrap";

const LoginDetails = () => {
  const role = sessionStorage.getItem("role");

  //   const paperStyle = {
  //     padding: 20,
  //     height: "30vh",
  //     marginLeft: 10,
  //     marginTop: 10,
  //     width: 300,
  //   };

  const paperStyle1 = {
    padding: 20,
    height: "30vh",
    marginLeft: 10,
    marginTop: 10,
    width: 300,
  };

  const [product, setproduct] = useState(false);
  const openProduct = () => {
    setproduct(true);
  };

  const closeProduct = () => {
    setproduct(false);
  };

  return (
    <div>
      {role === "1" ? (
        <div className="row">
          <div className="col">
            <Paper elevation={4} style={paperStyle1}>
              <h2> Add Product </h2>
              <Button variant="contained" onClick={openProduct} color="success">
                Add Product
              </Button>
            </Paper>
          </div>
          <div className="col">
            <Paper elevation={4} style={paperStyle1}>
              <h2> Add Coupon </h2>
              <Button variant="contained" color="success">
                Add Coupon
              </Button>
            </Paper>
          </div>
        </div>
      ) : null}

      <Modal show={product} onHide={closeProduct} centered size="lg">
        <Modal.Header closeButton> Add Product</Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginDetails;
