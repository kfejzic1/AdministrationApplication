import React, { useState } from "react";
import "./Login.css"
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import { loginFunction } from "../services/loginServices";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responese, setResponse] = useState('');

    const handleButtonClick = () => {
		loginFunction(email,password).then(res => {
			setResponse(res.data);
		});
	};

    return ( 
        <div className="App1"> 
            <div className="cover">                      
                    <h1>Login</h1>
                    <input className="user-data" type="text" placeholder="E-mail or Phone number" onChange={(e)=>{
                       setEmail(e.target.value)
                    }}/>

                    <input className="user-data" type="password" placeholder="Password" onChange={(e)=>{
                      setPassword(e.target.value)
                    }}/>
                    <p>You are not registered? <a href="/">Register</a></p>
                    <button className="login-btn" onClick={handleButtonClick}> Login</button>
                                
            </div>
        </div>
    );
}
 
export default LoginForm;