import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Login = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginRequest = async(event) =>{
    //this will prevent the default behaviour of the onSubmit page which is refreshing the page
    event.preventDefault()
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
        navigate("/preferences");
      }
    }catch(err){
      console.log(err)
    }
  }
  return (
    <>
    <header className='logo'>Welcome to Pet-Parent</header>
    <form className="login"
    onSubmit={loginRequest}
    >
    <div className='container'>
    <div className="form-title" id="form-title">Login</div>
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
    <button disabled={!username || !password} >Log In</button>
    <div className='divider' />
    <button className='create-user'
    onClick={()=>{
      navigate("/create-user")
    }}
    >Click here to Sign Up</button>
    {/* <Link to="/dashboard">Dashboard should be protected</Link>
    <Link to="/preferences">Preferences should be protected</Link> */}
    </div>
  </form>
  </>
  );
}

export default Login;