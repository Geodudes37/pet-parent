import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const petTypeArr = [
  { key: "cat-1", value: "cat", displayText: "cat" },
  { key: "dog-1", value: "dog", displayText: "dog" },
];
const genderArr = [
  { key: "male-1", value: "male", displayText: "male" },
  { key: "female-1", value: "female", displayText: "female" },
];
const colorArr = [
  { key: "black-1", value: "black", displayText: "black" },
  { key: "white-2", value: "white", displayText: "white" },
  { key: "golden-3", value: "golden", displayText: "golden" },
  { key: "brown-4", value: "brown", displayText: "brown" },
];

const Preferences = (props) => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    petType: "",
    gender: "",
    color: "",
    zipCode: "",
  });
  const [petData, setPetData] = useState(null);

  const { setSelectedPet } = props;
  //const petType = document.getElementById('petType').value;
  //const gender = document.getElementById('gender').value;
  //setPetType(petType);
  //setPetType(gender);

  const fetchPreferredPet = async () => {
    event.preventDefault();

    //this url will be re-worked
    const requestBody = {
      type: preferences.petType,
      gender: preferences.gender,
      color: preferences.color,
      zipcode: preferences.zipCode,
    };
    // const requestBody = {petType, gender, color, zipCode}
    console.log("submission button clicked, fetch initiated");
    const url = `http://localhost:3000/api/pets`;
    console.log(requestBody);
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(requestBody),
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setPetData(data);
      if (data) {
        setSelectedPet(data);
        navigate("/dashboard");
      }
    } catch (error) {
      (error) => console.log(error);
    }
    //      .then((response) => response.json())
    //      .then((data) => {
    //         setPetData(data);
    //    })
    //    .catch((err) => console.log(err));
  };

  const changeHandler = (entry, key) => {
    setPreferences({ ...preferences, [key]: entry.target.value });
  };

  const renderPetTypeOptions = () => {
    return petTypeArr.map((petTypeObj) => {
      return (
        <option
          key={petTypeObj.key}
          className="options"
          value={petTypeObj.value}
        >
          {petTypeObj.displayText}
        </option>
      );
    });
  };

  const renderGenderOptions = () => {
    return genderArr.map((genderTypeObj) => {
      return (
        <option
          key={genderTypeObj.key}
          className="options"
          value={genderTypeObj.value}
        >
          {genderTypeObj.displayText}
        </option>
      );
    });
  };

  const renderColorOptions = () => {
    return colorArr.map((colorTypeObj) => {
      return (
        <option
          key={colorTypeObj.key}
          className="options"
          value={colorTypeObj.value}
        >
          {colorTypeObj.displayText}
        </option>
      );
    });
  };

  return (
    <div className="form-container">
      <h2>Pick your pet preferences</h2>
      <form action="" onSubmit={fetchPreferredPet} className="form container">
        {/* first dropdown */}

        <div className="dropdown">
          <label htmlFor="dropdown-1">Pick your pet type</label>
          <select
            id="dropdown-1"
            className="select"
            onChange={(e) => {
              changeHandler(e, "petType");
            }}
            value={preferences.petType}
          >
            <option value="petType">Pick an option</option>
            {renderPetTypeOptions()}
          </select>
        </div>

        {/* second dropdown */}

        <div className="dropdown">
          <label htmlFor="dropdown-2">Pick your pet gender</label>
          <select
            id="dropdown-2"
            className="select"
            onChange={(e) => {
              changeHandler(e, "gender");
            }}
            value={preferences.gender}
          >
            <option value="gender">Pick an option</option>
            {renderGenderOptions()}
          </select>
        </div>

        {/* third dropdown */}
        <div className="dropdown">
          <label htmlFor="dropdown-3">Pick your pet color</label>
          <select
            id="dropdown-3"
            className="select"
            onChange={(e) => {
              changeHandler(e, "color");
            }}
            value={preferences.color}
          >
            <option value="color">Pick an option</option>
            {renderColorOptions()}
          </select>
        </div>

        {/* enter ZipCode */}
        <div className="zip-code">
          <label htmlFor="zip-code">Enter your zipcode</label>
          <input
            type="text"
            onChange={(e) => {
              changeHandler(e, "zipCode");
            }}
          />
        </div>
        {/* submit button */}
        <button>Submit Preferences</button>
        <Link to="/dashboard">Dashboard</Link>
      </form>
    </div>
  );
};

export default Preferences;
