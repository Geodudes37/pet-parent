import React, { useState } from 'react';
import { SCREEN_MAP } from './App.jsx';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const CreateUser = (props) => {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userCreated, setUserCreated] = useState(false)

  const navigate = useNavigate();

  const sendUserInfo = async (ele) => {
    setUserCreated(false)
    const requestBody = { name, username, password };
    console.log(requestBody);

    //make sure user fill out all required fields
    if (name === '' || username === ''|| password === '') {
      return alert('Please fill out the blank field');
    }

    //post request to create user
    try {
      const response = await fetch('/createUser', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
      const data = await response.json()
      if (data) { 
        if (data.error) {
          window.alert(data.error.detail)
        } else {
          setUserCreated(true)
        }
      } else {console.log('noooo')}
    }
    catch (e) {
      console.log(e)
    }
  }
  // const sendUserInfo = (ele) => {
  //   const requestBody = { name, username, password };
  //   console.log(requestBody);

  //   //make sure user fill out all required fields
  //   if (name === '' || username === ''|| password === '') {
  //     return alert('Please fill out the blank field');
  //   }

  //   //post request to create user
  //   fetch('/createUser', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(requestBody),
  //   })
  //     .then((response) => 
  //       response.json())
  //     .then((data) => {
  //       console.log('2nd data', data);
  //       //save username to state
  //       props.setUserInfo(data.username);
  //       // props.setShowWebsite(true);
  //       // props.setCreateAccount(false);
  //     }).catch(() => {
  //       alert('The username has already been taken.');
  //     })
  // }

  return (
  <div className='create-user container'>
    <h4 className="form-title">Create User!</h4>
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
            sendUserInfo(e);
          }}
        >
          Submit
        </button>
        <button 
         onClick={()=>{
          navigate("/")
        }}
        >Go back to Login</button>
        {userCreated && <div className='success-message'>
          User successfully created, please go to Login page!
        </div>}
  </div>);
}

export default CreateUser;