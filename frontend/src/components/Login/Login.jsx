import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import "../PitchIdea/PitchIdea.css";

function Register() {
  const [show, setShow] = useState(false);
  //Form show function
  const handleShow = () => setShow(true);
  //Form close
  const handleClose = () => setShow(false);
  //Login Functinality
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const handleInput = (value) => {
    return setUser((prev) => {
      return { ...prev, ...value };
    });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const newUser = { ...user };

    await fetch("http://localhost:8081/login", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((result) => {
        console.log(result);
        setLogin(true);
      })
      .catch((error) => {
        console.log(error);
        error = new Error();
      });
  };
  return (
    <>
      <Button className="button" onClick={handleShow}>
        Login
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-2">
          <Form method="POST">
            {/*Investor / Entreprener Name */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="form-lable">
                Enterpreneur/Investor Name
              </Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter Your Name"
                value={user.name}
                onChange={(e) => handleInput({ name: e.target.value })}
                autoFocus
                required
              />
            </Form.Group>
            {/* Investor/Entreprener Email */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label className="form-lable">
                Enterpreneur/Investor Email
              </Form.Label>
              <Form.Control
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Your Email"
                value={user.email}
                onChange={(e) => handleInput({ email: e.target.value })}
                autoFocus
                required
              />
            </Form.Group>
            {/* Investor/Entreprener Password */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label className="form-lable">Enter Password</Form.Label>
              <Form.Control
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter Password"
                value={user.password}
                onChange={(e) => handleInput({ password: e.target.value })}
                autoFocus
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmitLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Register;
