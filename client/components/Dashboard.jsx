import React from 'react';
import { SCREEN_MAP } from './App.jsx';

const Dashboard = (props) => {
  return (<div className='dashboard'>
    Dashboard!
    <button onClick={() => {props.setCurrentScreen(SCREEN_MAP.login)}}>Go to Login!</button>
  </div>);
}

export default Dashboard;