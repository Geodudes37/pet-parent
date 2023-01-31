import React from 'react';
import { SCREEN_MAP } from './App.jsx';
import { Link } from 'react-router-dom';


const Dashboard = (props) => {
  return (<div className='dashboard container'>
    Dashboard!
    {/* <button onClick={() => {props.setCurrentScreen(SCREEN_MAP.login)}}>Go to Login!</button> */}
    <Link to="/login">Go to Login!</Link>
  </div>);
}

export default Dashboard;