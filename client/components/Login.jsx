import React from 'react';
import { SCREEN_MAP } from './App.jsx';


const Login = (props) => {
  return (<div className="login">
    Login!
    <button onClick={() => {props.setCurrentScreen(SCREEN_MAP.createUser)}}>Go to create user!</button>
  </div>);
}

export default Login;