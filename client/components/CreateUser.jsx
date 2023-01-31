import React from 'react';
import { SCREEN_MAP } from './App.jsx';

const CreateUser = (props) => {
  return (<div className='create-user'>
    Create User!
    <button onClick={() => {props.setCurrentScreen(SCREEN_MAP.dashboard)}}>Go to dashboard!</button>
  </div>);
}

export default CreateUser;