import React from "react";
import CounterOfferForm from "../../components/CounterOfferForm/CounterOfferForm";
import ShowOffer from "../ShowOffer/ShowOffer";
import "./Pitchs.css";
function Pithcs(props) {
  // const [offers, setOffers] = useState([]);
  // setOffers(props.pitch.offers);
  const offers = props.pitch.offers;
  const pitchId = props.pitch.id;
  // console.log("counter offers : ");
  // console.log(offers);

  return (
    <>
      <div>
        <h6>
          {" "}
          Entrepreneur : <span>{props.pitch.entrepreneur}</span>
        </h6>
      </div>
      <div>
        <h6>
          {" "}
          Pitch Title : <span>{props.pitch.pitchTitle}</span>
        </h6>
      </div>
      <div>
        <h6>
          {" "}
          Description : <span>{props.pitch.pitchIdea}</span>
        </h6>
      </div>
      <div>
        <h6>
          {" "}
          Asked Amount :<span>{props.pitch.askAmount}</span>{" "}
        </h6>
      </div>
      <div>
        <h6>
          {" "}
          Offered Equity :<span>{props.pitch.equity}</span>{" "}
        </h6>
      </div>
      <div>
        <h6 className="counter-button">
          Counter Offers{" "}
          <div>
            <CounterOfferForm pitchId={pitchId} key={props.pitch.id} />
            <ShowOffer offers={offers} key={props.pitch.id}></ShowOffer>
          </div>
        </h6>
      </div>
    </>
  );
}

export default Pithcs;
