import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "../MainPage/MainPage.css";
import LogoBig from "../../image/Logo1.png";
import Cartoon from "../../image/human.png";
import Register from "../Register/Register";
import Login from "../Login/Login";
export const LandingPage = () => {
  return (
    <>
      <Container fluid className="bgImage">
        <div className="parent">
          <div></div>
          <div className="image-parent">
            <img src={LogoBig} alt="logo1" className="logo2"></img>
            <div>
              <Register />
              <Login/>
            </div>
          </div>
          <div></div>
        </div>
      </Container>
    </>
  );
};
