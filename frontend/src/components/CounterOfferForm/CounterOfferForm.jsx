import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button, Modal, Form } from "react-bootstrap";
import "./CounterOfferForm.css";
function CounterOfferForm(props) {
  //Model open close functions
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [offers, setOffers] = useState({
    investor: "",
    amount: 0,
    equity: 0,
    comment: "",
  });
  const navigate = useNavigate();
 
  function handleInput(value) {
    return setOffers((prev) => {
      return { ...prev, ...value };
    });
  }
  //onSubmit the makeOffer Form
  const submitHandler = async (e) => {
    e.preventDefault();
    const editedOffer = {
      ...offers,
    };

    await fetch(`http://localhost:8081/pitches/${props.pitchId}/makeOffer`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedOffer),
    }).catch((e) => {
      window.alert("Something went wrong");
      console.log(e);
      return;
    });
    setOffers({
      investor: "",
      amount: 0,
      equity: 0,
      comment: "",
    });
    handleClose();
    navigate("/");
  };
  return (
    <>
      <Button className="offer-btn" onClick={handleShow}>
        Make Offer
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>Pitch Your Idea</Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-2">
          <Form method="POST">
            {/* Investor */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="form-lable">Investor Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                className="form-control"
                value={offers.investor}
                onChange={(e) => handleInput({ investor: e.target.value })}
                autoFocus
                required
              />
            </Form.Group>
            {/* Comment */}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="form-lable">Comment</Form.Label>
              <Form.Control
                placeholder="Enter your counter offer or comment"
                className="form-control"
                as="textarea"
                rows={3}
                value={offers.comment}
                onChange={(e) => handleInput({ comment: e.target.value })}
                required
              />
            </Form.Group>
            {/* equity counted */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="form-lable">
                Percentage Equity willing to Counter
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Percentage equity you are willing to offer to your Entreprenure"
                className="form-control"
                value={offers.equity}
                onChange={(e) =>
                  handleInput({ equity: parseInt(e.target.value) })
                }
                autoFocus
                required
              />
            </Form.Group>
            {/* Counteress Amount */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="form-lable">
                Counter Investment Amount
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Money you are willling to offer"
                className="form-control"
                value={offers.amount}
                onChange={(e) =>
                  handleInput({ amount: parseInt(e.target.value) })
                }
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={submitHandler}>
            Submit Counter Offer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CounterOfferForm;
