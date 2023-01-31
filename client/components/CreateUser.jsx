import React, { useState } from 'react';
import { SCREEN_MAP } from './App.jsx';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const CreateUser = (props) => {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const sendUserInfo = (ele) => {
    const requestBody = { name, username, password };
    console.log(requestBody);

    //make sure user fill out all required fields
    if (name === '' || username === ''|| password === '') {
      return alert('Please fill out the blank field');
    }

    //post request to create user
    fetch('http://localhost:8082/create-user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((data) => data.json)
      .then((data) => {
        console.log(data);
        //save username to state
        props.setUserInfo(data.username);
        props.setShowWebsite(true);
        props.setCreateAccount(false);
      })
      .catch(() => {
        alert('The username has already been taken.');
      })
  }

  return (
  <div className='create-user container'>
    <h4>Create User!</h4>
    <div className="input-container">
        <label>Name</label>
        <input
          type="text"
          name="name"
          required
          className="login-input"
          id="name"
          onChange={(e) => {
            setName(e.target.value);
            console.log(name);
          }}
        />
      </div>
      <div className="input-container">
        <label>Username</label>
        <input
          type="text"
          name="username"
          required
          className="login-input"
          id="username"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </div>
      <div className="input-container">
        <label>Password</label>
        <input
          type="text"
          name="password"
          required
          className="login-input"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
        <button
          onClick={(e) => {
            sendInfo(e);
          }}
        >
          submit
        </button>
        <button 
         onClick={()=>{
          navigate("/")
        }}
        >Go back to Login</button>
      {/* <Link to="/">Go back to Login</Link>  */}
    {/* { <button onClick={() => {props.setCurrentScreen(SCREEN_MAP.dashboard)}}>Go to dashboard!</button> } */}
  </div>);
}

export default CreateUser;