import React, {useState} from 'react';
import Login from '../components/Login.jsx';
import CreateUser from '../components/CreateUser.jsx';
import Dashboard from '../components/Dashboard.jsx'
import '../public/stylesheets/styles.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import Preferences from './Preferences.jsx';

const App = () => {
  
  return(
    <Router>
      <div className='app-page'>
        <Routes>
          <Route exact path='/create-user' element={<CreateUser/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route exact path='/' element={<Login/>}/>
            <Route exact path='/preferences' element={<Preferences/>}/>
            <Route exact path='/dashboard' element={<Dashboard/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  ) 
}

export default App;
