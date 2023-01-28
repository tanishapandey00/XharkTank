import React from "react";
import "./CounterOffers.css";
function CounterOffers(props) {
  // console.log("Offer :");
  // console.log("id " + props.offer.id);
  // console.log("investor " + props.offer.investor);
  // console.log("equity " + props.offer.equity);
  // console.log("amount " + props.offer.amount);
  // console.log("comment " + props.offer.comment);
  return (
    <>
      <div className="offer">
        <hr></hr>
        <div>
          <h6>
            {" "}
            Id : <span>{props.offer.id}</span>
          </h6>
        </div>
        <div>
          <h6>
            {" "}
            Investor : <span>{props.offer.investor}</span>
          </h6>
        </div>
        <div>
          <h6>
            {" "}
            Equity: <span>{props.offer.equity}</span>
          </h6>
        </div>
        <div>
          <h6>
            {" "}
            Amount: <span>{props.offer.amount}</span>
          </h6>
        </div>
        <div>
          <h6>
            {" "}
            Comment: <span>{props.offer.comment}</span>
          </h6>
        </div>
      </div>
    </>
  );
}

export default CounterOffers;
