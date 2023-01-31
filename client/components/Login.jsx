import React from 'react';
import { Link } from 'react-router-dom';
import { SCREEN_MAP } from './App.jsx';


const Login = (props) => {
  return (
    <>
    <div className="login">
    <div className='container'>
    Login!
    {/* <button onClick={() => {props.setCurrentScreen(SCREEN_MAP.createUser)}}>Go to create user!</button> */}
    <Link to="/create-user">Go to create user!</Link>
    </div>
  </div>
  </>
  );
}

export default Login;