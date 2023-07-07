import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import "../PitchIdea/PitchIdea.css";
import Login from "../Login/Login";
function Register() {
  const [show, setShow] = useState(false);
  //Form show function
  const handleShow = () => setShow(true);
  //Form close
  const handleClose = () => setShow(false);

  //Registration functionality
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [register, setRegister] = useState(false);

  const navigate = useNavigate();
  //handle Input Function
  const handleInput = (value) => {
    return setUser((prev) => {
      return { ...prev, ...value };
    });
  };
  // handle Submit register
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    //pushing registeration data to database
    const newUser = { ...user };

    await fetch("http://localhost:8081/register", {
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
        setRegister(true);
      })
      .catch((e) => {
        window.alert("Something went wrong");
        console.log(e);
        return;
      });

    setUser({
      name: "",
      email: "",
      password: "",
    });
    handleClose();
    navigate("/");
  };
  return (
    <>
      {register ? (
        <Login />
      ) : (
        <div>
          <Button className="button" onClick={handleShow}>
            Register
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header className="modal-header" closeButton>
              <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body className="m-2">
              <Form method="POST">
                {/*Investor / Entreprener Name */}
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="form-lable">
                    Enterpreneur/Investor Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Name"
                    name="name"
                    value={user.name}
                    onChange={(e) => handleInput({ name: e.target.value })}
                    autoFocus
                    required
                  />
                </Form.Group>
                {/* Investor/Entreprener Email */}
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
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
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput3"
                >
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
              <Button variant="primary" onClick={handleSubmitRegister}>
                Register
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
}

export default Register;
