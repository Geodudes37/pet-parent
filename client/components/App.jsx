import React, {useState} from 'react';
import Login from '../components/Login.jsx';
import CreateUser from '../components/CreateUser.jsx';
import Dashboard from '../components/Dashboard.jsx'
import '../public/stylesheets/styles.scss'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

export const SCREEN_MAP = {
    login: 'login',
    createUser: 'createUser',
    dashboard: 'dashboard'
};

const App = () => {

  // const [currentScreen, setCurrentScreen] = useState(SCREEN_MAP.login);
  return(
    <Router>
      <div className='app-page'>
        {/* <Link to="/login">Login</Link>
        <Link to="/create-user">Create User</Link>
        <Link to="/">Dashboard</Link> */}

        <Routes>
          <Route exact path='/' element={<Dashboard/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/create-user' element={<CreateUser/>}/>

          {/* {currentScreen === SCREEN_MAP.createUser && (
              <CreateUser setCurrentScreen={setCurrentScreen}/>
          )}
          {currentScreen === SCREEN_MAP.login && (
            <Login setCurrentScreen={setCurrentScreen}/>
          )}
          {currentScreen === SCREEN_MAP.dashboard && (
            <Dashboard setCurrentScreen={setCurrentScreen}/>
          )} */}
          
        </Routes>
      </div>
    </Router>
  ) 
}

export default App;