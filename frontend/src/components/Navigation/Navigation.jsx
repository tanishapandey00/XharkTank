import React from "react";
import "./Navigation.css";
import { Container, Navbar } from "react-bootstrap";
import WebLogo from "../../image/logo2.png";
function Navigation() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              src={WebLogo}
              className="weblogo"
              alt="Xhark Tank logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
