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
                <h1>Prijavi se</h1>
                <input type="text" placeholder="username" onChange={(e)=>{
                    setUsername(e.target.value)
                }}/>
                <input type="password" placeholder="password" onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
                <p>Nisi registrovan.<a href="/">  Registruj se</a></p>
                <button className="login-btn"> Logiraj se</button>                          
            </div>
        </div>
    );
}
 
export default LoginForm;