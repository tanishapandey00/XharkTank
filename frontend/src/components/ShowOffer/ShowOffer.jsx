import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import CounterOffers from "../../components/CounterOffers/CounterOffers";
import "./ShowOffer.css";

function ShowOffer(props) {
  const [open, setOpen] = useState(false);
  // console.log("Call from showoffers page");
  const offers = props.offers;
  // console.log(offers);

  const offerList = () => {
    return offers.map((offer) => {
      // console.log(offer.id);
      return (
        <div>
          <CounterOffers offer={offer} key={offer.id}></CounterOffers>
        </div>
      );
    });
  };
  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className="offer-btn"
      >
        Show Offers
      </Button>
      <div>
        <Collapse in={open}>
          <div id="example-collapse-text">{offerList()}</div>
        </Collapse>
      </div>
    </>
  );
}

export default ShowOffer;
