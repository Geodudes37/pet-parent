import React, {useState} from 'react';
import { Link } from 'react-router-dom';
// import { SCREEN_MAP } from './App.jsx';
import { useNavigate } from "react-router-dom";


const Login = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginRequest = async() =>{
    const requestBody = {
      username,
      password,
    };
    try{
      const response = await fetch('/login', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(requestBody),
      });
      const data = await response.json()
      if(data){
        navigate("/dashboard");
      }
    }catch(err){
      console.log(err)
    }
  }
  return (
    <>
    <header className='logo'>Welcome to Pet-Parent</header>
    <div className="login">
    <div className='container'>
    <div id="login-title">Login</div>
    <label>
      Username
      <input 
      value={username}
      onChange={(event)=>{
        setUsername(event.target.value)
      }}
      type="text" 
      />
    </label>
    <label>
      Password
      <input 
      value={password}
      onChange={(event)=>{
        setPassword(event.target.value)
      }}
      type="password" 
      />
    </label>
    <button disabled={!username || !password} onClick={loginRequest}>Log In</button>
    <div className='divider' />
    <button className='create-user'
    onClick={()=>{
      navigate("/create-user")
    }}
    >Click here to Sign Up</button>
    {/* <button onClick={() => {props.setCurrentScreen(SCREEN_MAP.createUser)}}>Go to create user!</button> */}
    {/* <Link to="/create-user">Go to create user!</Link> */}
    </div>
  </div>
  </>
  );
}

export default Login;