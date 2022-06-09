import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Navbar, NavbarBrand } from "reactstrap";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const logoutFunc = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <header>
      <Navbar
        className="d-flex  align-items-center"
        color="dark"
        light
        expand="md"
      >
        <NavbarBrand id="navbar-brand" href="/homepage">
          ToDo
        </NavbarBrand>

        <Col md={3} className="d-flex justify-content-end align-items-center">
          <p className="text-white mb-0 mx-2">Hello, Admin</p>
          <Button onClick={() => logoutFunc()} className="mx-2">
            Logout
          </Button>
        </Col>
      </Navbar>
    </header>
  );
};

export default Header;
