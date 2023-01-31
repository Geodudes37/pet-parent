import React, {useState} from 'react';
import Login from '../components/Login.jsx';
import CreateUser from '../components/CreateUser.jsx';
import Dashboard from '../components/Dashboard.jsx'
import '../public/stylesheets/styles.scss'

export const SCREEN_MAP = {
    login: 'login',
    createUser: 'createUser',
    dashboard: 'dashboard'
};

const App = () => {

  const [currentScreen, setCurrentScreen] = useState(SCREEN_MAP.login);
  return(
    <div className='app-page'>
        {currentScreen === SCREEN_MAP.createUser && (
            <CreateUser setCurrentScreen={setCurrentScreen}/>
        )}
        {currentScreen === SCREEN_MAP.login && (
          <Login setCurrentScreen={setCurrentScreen}/>
        )}
        {currentScreen === SCREEN_MAP.dashboard && (
          <Dashboard setCurrentScreen={setCurrentScreen}/>
        )}
    </div>
  ) 
}

export default App;