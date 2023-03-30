import React, { useState } from "react";
import "./Login.css"
import { useNavigate, useLocation } from "react-router-dom";
import { loginFunction } from "../services/loginServices";
import { Button, Typography, TextField, Input, Alert } from "@mui/material"

const LoginForm = (arg ) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const navigate = useNavigate();

    function checkData(input) {
        const regex = new RegExp('^[0-9]+$');
        if (input.length <= 10 && input.match(regex))
            return "phone";
        else 
            return "email";
      }


    const handleButtonClick = () => {
        if(checkData(email)==='email'){
            arg.setEmail(email)
            loginFunction(email,password).then(res => {
                setErrorMessage("");
                const email1 = email;
                console.log(email1);
            }).catch(err => {
                setErrorMessage("Neuspješna prijava!");
            });
        }else{
            arg.setEmail(email)
            loginFunction(email,password).then(res => {
                setErrorMessage("");
                const { token } = res.data;
                localStorage.setItem('token', token);
                const email1 = email;
                console.log(email1);
                navigate('/twofactor');
            }).catch(err => {
                setErrorMessage("Neuspješna prijava!");
            });

        }
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

                <div class="customBtn">
                    <span class="icon"><img class="login-icons" src="https://i.imgur.com/JsniGks.png" width={25} height={25} alt="googleicon" /></span>
                    <span class="buttonText">Sign in with Google</span>
                </div>
                <div class="customBtn">
                    <span class="icon"><img class="login-icons" src="https://i.imgur.com/fDEMtZy.png" width={25} height={25} alt="fbicon" /></span>
                    <span class="buttonText">Sign in with Facebook</span>
                </div>
                <div class="customBtn">
                    <span class="icon"><img class="login-icons" src="https://i.imgur.com/5pDDS3b.png" width={25} height={25} alt="msicon" /></span>
                    <span class="buttonText">Sign in with Microsoft</span>
                </div>

                <Typography>You are not registered? <a href="/">Register</a></Typography>
                <button className="login-btn" onClick={handleButtonClick}> Login</button>
            </div>
        </div>
    );

}

export default LoginForm;
            