import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { redirect } from "react-router-dom";

const Dashboard = (props) => {
  const { selectedPet } = props;
  const { name, photos, url } = selectedPet;
  const [score, setScore] = useState(0);
  const [winCondition, setWinCondition] = useState("");

  const feedPetHandler = () => {
    console.log("current score is: ", score);
    const newScore = score + Math.floor(Math.random() * 5) + 5;
    setScore(newScore);
    console.log("current score: ", score);
  };

  const playPetHandler = () => {
    const newScore = score + Math.floor(Math.random() * 5) + 5;
    setScore(newScore);
    console.log("current score: ", score);
  };

  useEffect(() => {
    if (score >= 100) {
      setWinCondition(
        <div>
          Congrats, you're ready to be a pet parent! Adopt {name} now by
          clicking <a href={url}>here</a>!
        </div>
      );
    }
  }, [score]);

  return (
    <div className="dashboard-page">
      <h2>{name}</h2>
      {/* Info about the picture element: https://web.dev/learn/design/picture-element/ */}
      <div className="profile-pic-wrapper">
        <picture>
          <source srcSet={photos[0].large} media="(min-width: 75em)" />
          <source srcSet={photos[0].medium} media="(min-width: 40em)" />
          <img
            alt="doggo-pic"
            src={photos[0].small}
            loading="lazy"
            decoding="async"
          />
        </picture>
        {/* <meter min="0" low="10" optimum="50" high="90" max="100"></meter> */}
      </div>
      <div className="doggie-care-buttons">
        <button onClick={feedPetHandler}>Feed me</button>
        <button onClick={playPetHandler}>Walk me</button>
      </div>
      <div className="score-board">
        Current Score = {score}
        <div>{winCondition}</div>
      </div>
    </div>
  );
};

export default Dashboard;
