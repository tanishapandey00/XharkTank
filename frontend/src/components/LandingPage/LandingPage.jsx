import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./LandingPage.css";
import LogoBig from "../../image/Logo1.png";
import Cartoon from "../../image/human.png";
import PitchIdea from "../PitchIdea/PitchIdea";
import Pithcs from "../Pitchs/Pithcs";
function LandingPage() {
  //Pitchs
  const [pitchs, setPitchs] = useState([]);
  //fetching the pitch from database
  useEffect(() => {
    async function getPitchs() {
      const response = await fetch("http://localhost:8081/pitches");

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const pitchs = await response.json();
      setPitchs(pitchs);
    }

    getPitchs();
    return;
  }, [pitchs.length]);

  const pitchList = () => {
    return pitchs.map((pitch) => {
      return (
        <div className="pitch">
          <Pithcs pitch={pitch} key={pitch.id}></Pithcs>
          {/* console.log("Pitch :"); console.log(props.pitch); */}
        </div>
      );
    });
  };

  return (
    <>
      <Container fluid className="bgImage">
        <div className="parent">
          <div>
            <PitchIdea />
          </div>
          <div className="image-parent">
            <img src={LogoBig} alt="logo1" className="logo2"></img>
            <img src={Cartoon} alt="cartoon" className="cartoon"></img>
            <div>{pitchList()}</div>
          </div>
          <div></div>
        </div>
      </Container>
    </>
  );
}

export default LandingPage;
