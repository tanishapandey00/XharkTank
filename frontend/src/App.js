// import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import Navigation from "./components/Navigation/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Navigation />
      <LandingPage />
    </div>
  );
}

export default App;
