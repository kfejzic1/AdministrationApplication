import React, { useState } from "react";
import "./Login.css"
import Axios from 'axios'
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return ( 
        <div className="App1"> 
            <div className="cover">                      
                    <h1>Login</h1>
                    <input type="text" placeholder="E-mail or Phone number" onChange={(e)=>{
                       setUsername(e.target.value)
                    }}/>

                    <input type="password" placeholder="Password" onChange={(e)=>{
                      setPassword(e.target.value)
                    }}/>
                    <p>You are not registered? <a href="/">Register</a></p>
                    <button className="login-btn"> Login</button>
                                
            </div>
        </div>
    );
}
 
export default LoginForm;