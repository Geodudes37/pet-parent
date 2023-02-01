import React from "react";
import { Link } from "react-router-dom";
import { redirect } from "react-router-dom";

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

const Dashboard = (props) => {
  const { name, photos } = DUMMY_DATA_DOG;
  return (
    <div className="dashboard-page">
      <h2>{name}</h2>
      {/* Info about the picture element: https://web.dev/learn/design/picture-element/ */}
      <div className="profile-pic-wrapper">
        <picture>
          <source srcSet={photos[0].large} media="(min-width: 75em)" />
          <source srcSet={photos[0].medium} media="(min-width: 40em)" />
          <img
            src={photos[0].small}
            alt="doggo-pic"
            loading="lazy"
            decoding="async"
          />
        </picture>
        {/* <meter min="0" low="10" optimum="50" high="90" max="100"></meter> */}
      </div>
      <div className="doggie-care-buttons">
        <button onClick={() => {}}>Feed me</button>
        <button onClick={() => {}}>Walk me</button>
      </div>
    </div>
  );
};

export default Dashboard;
