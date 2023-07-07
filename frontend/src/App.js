// import "./App.css";
import { LandingPage } from "./components/LandingPage/LandingPage";
import MainPage from "./components/MainPage/MainPage";
import Navigation from "./components/Navigation/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navigation />
      {/* <LandingPage/> */}
      <MainPage/>
    </div>
  );
}

export default App;
