import React from 'react';
import { Link } from 'react-router-dom';
import { redirect } from 'react-router-dom';

const Dashboard = (props) => {
  return (
  <div className='dashboard container'>
    Dashboard!
    <Link to="/login">Go to Login!</Link>
  </div>
  );
}

export default Dashboard;