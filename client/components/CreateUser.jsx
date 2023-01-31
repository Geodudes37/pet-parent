import React from 'react';
// import { SCREEN_MAP } from './App.jsx';
import { Link } from 'react-router-dom';


const CreateUser = (props) => {
  return (
  <div className='create-user container'>
    Create User!
    {/* <button onClick={() => {props.setCurrentScreen(SCREEN_MAP.dashboard)}}>Go to dashboard!</button> */}
    <Link to="/">Go to dashboard!</Link>
  </div>
  );
}

export default CreateUser;