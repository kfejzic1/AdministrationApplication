import React, { useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";
import { loginFunction } from "../services/loginServices";
import { Button, Typography, TextField, Input, Alert } from "@mui/material"

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 

    const handleButtonClick = () => {
		loginFunction(email,password).then(res => {
            setErrorMessage("");
            window.location.href = 'http://localhost:3000/twofactor';
		}).catch(err => {
            setErrorMessage("Neuspješna prijava!");
        });
	};

    return ( 
        <div className="App1"> 
            <div className="cover">                  
                <Typography variant="h4">Login</Typography>
                <Alert severity="error" variant="filled" style={{display: "none"}}>{errorMessage}</Alert>
                <div classname="alert-box">
                    <Typography variant="h5">{errorMessage}</Typography>
                </div>  
                <Input className="user-data" type="text" placeholder="E-mail or Phone number" onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
                <Input className="user-data" type="password" placeholder="Password" onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
                <Typography>You are not registered? <a href="/">Register</a></Typography>
                <button className="login-btn" onClick={handleButtonClick}> Login</button>
            </div>
        </div>
    );

}

export default LoginForm;
            