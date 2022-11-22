import React, { useState } from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Modal, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

const NavBar = () => {
  let navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const profile = sessionStorage.getItem("dp");

  const [modal, setmodal] = useState(false);

  const openModal = () => {
    setmodal(true);
  };

  const closeModal = () => {
    setmodal(false);
  };

  const formSubmit = () => {
    closeModal();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <Nav>
        <Navbar.Brand className="justify-content-start">
          <NavLink to="/">
            <h3> Smart Buy </h3>
          </NavLink>
        </Navbar.Brand>

        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/coupon"> Coupons </NavLink>
          <NavLink to="/cart"> My Cart</NavLink>
          <NavLink to="/orders"> My Orders</NavLink>

          {sessionStorage.getItem("condition") ===
          null ? null : sessionStorage.getItem("dp") === null ? (
            <>
              <NavLink activeStyle>
                <AccountCircleIcon />
              </NavLink>
            </>
          ) : (
            <Avatar
              alt={username}
              src={profile}
              sx={{ width: 45, height: 45 }}
            />
          )}
          {sessionStorage.getItem("condition") === null ? null : (
            <>
              <NavDropdown
                color="white"
                title={sessionStorage.getItem("username")}
                drop="left"
              >
                <NavDropdown.Item href="logindetails">
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => openModal()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}

          {sessionStorage.getItem("condition") === null ? (
            <>
              <NavLink to="login" activeStyle>
                <AccountCircleIcon />
              </NavLink>
            </>
          ) : null}
        </NavMenu>
      </Nav>

      <Modal show={modal} onHide={closeModal} centered size="lg">
        <Modal.Header closeButton> </Modal.Header>

        <Modal.Body>
          Do you want to log out ?
          <br />
          <br />
          <Button
            color="primary"
            variant="contained"
            style={{ marginRight: 10 }}
            onClick={() => formSubmit()}
          >
            Yes
          </Button>
          <Button
            color="error"
            variant="contained"
            style={{ marginRight: 10 }}
            onClick={() => closeModal()}
          >
            No
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NavBar;
