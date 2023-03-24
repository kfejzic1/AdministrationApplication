import React, { useState } from "react";
import "./TwoFactor.css"
import Axios from 'axios'
import { useNavigate } from "react-router-dom";

const TwoFactorView = () => {
    

    return ( 
        <div className="App1"> 
            <div className="cover">
                    <h1>2-Factor Authentication</h1>
                    <h3>You recieved a 6-digit code on your e-Mail/Phone. Please input your code here!</h3>
                    <input className="code-input" type="text" placeholder="Your code" maxLength={6} onChange={(e)=>{
                       // setUsername(e.target.value)
                    }}/>
                    <button className="verify-btn"> Verify</button>
                                
            </div>
       </div>
       
    );
}
 
export default TwoFactorView;