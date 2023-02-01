import React, { useState } from "react";
import Login from "../components/Login.jsx";
import CreateUser from "../components/CreateUser.jsx";
import Dashboard from "../components/Dashboard.jsx";
import "../public/stylesheets/styles.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import Preferences from "./Preferences.jsx";

const DUMMY_DATA_DOG = {
  name: "Spot",
  photos: [
    {
      small:
        "https://photos.petfinder.com/photos/pets/42706540/1/?bust=1546042081&width=100",
      medium:
        "https://photos.petfinder.com/photos/pets/42706540/1/?bust=1546042081&width=300",
      large:
        "https://photos.petfinder.com/photos/pets/42706540/1/?bust=1546042081&width=600",
      full: "https://photos.petfinder.com/photos/pets/42706540/1/?bust=1546042081",
    },
  ],
  videos: [
    {
      embed:
        '<iframe src="https://www.youtube.com/embed/xaXbs1fRFRM" frameborder="0" allowfullscreen></iframe>',
    },
  ],
};

const App = () => {
  const [selectedPet, setSelectedPet] = useState(DUMMY_DATA_DOG);

  return (
    <Router>
      <div className="app-page">
        <Routes>
          <Route exact path="/create-user" element={<CreateUser />} />
          <Route element={<ProtectedRoutes />}>
            <Route exact path="/" element={<Login />} />
            <Route
              exact
              path="/preferences"
              element={<Preferences setSelectedPet={setSelectedPet} />}
            />
            <Route
              exact
              path="/dashboard"
              element={<Dashboard selectedPet={selectedPet} />}
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
