import React, { useState } from "react";
import {useRef} from 'react';
import "./TwoFactor.css"
import { twoFactorAut } from "../services/loginServices";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";

const TwoFactorView = () => {
    const digit1 = useRef(null);
    const digit2 = useRef(null);
    const digit3 = useRef(null);
    const digit4 = useRef(null);
    const digit5 = useRef(null);
    const digit6 = useRef(null);
    
    const handleButtonClick = () => {
        const allDigts = digit1+ digit2+ digit3+ digit4+ digit5+ digit6;
        twoFactorAut(allDigts).then(res => {
			setResponse(res.data);
		});
    }

    return ( 
        <div className="App1"> 
            <div className="cover">
                    <h1>2-Factor Authentication</h1>
                    <h3>You received a 6-digit code on your e-Mail/Phone. Please input your code here!</h3>
                    <div className="code-container">
                        <input className="code-input" ref={digit1} type="text" maxLength={1} autoComplete="none" onChange={(e)=>{
                            if (e.target.value.length > 0)
                                digit2.current.focus();
                                
                        }}/>
                        <input className="code-input" ref={digit2} type="text" maxLength={1} autoComplete="none" onChange={(e)=>{
                            if (e.target.value.length > 0)
                                digit3.current.focus();
                            else
                                digit1.current.focus();
                        }}/>
                        <input className="code-input" ref={digit3} type="text" maxLength={1} autoComplete="none" onChange={(e)=>{
                            if (e.target.value.length > 0)
                                digit4.current.focus();
                            else
                                digit2.current.focus();
                        }}/>
                        <input className="code-input" ref={digit4} type="text" maxLength={1} autoComplete="none" onChange={(e)=>{
                            if (e.target.value.length > 0)
                                digit5.current.focus();
                            else
                                digit3.current.focus();
                        }}/>
                        <input className="code-input" ref={digit5} type="text" maxLength={1} autoComplete="none" onChange={(e)=>{
                            if (e.target.value.length > 0)
                                digit6.current.focus();
                            else
                                digit4.current.focus();
                        }}/>
                        <input className="code-input" ref={digit6} type="text" maxLength={1} autoComplete="none" onChange={(e)=>{
                            if (e.target.value.length === 0)
                                digit5.current.focus();
                        }}/>
                    </div>
                    
                    <button className="verify-btn" onClick={handleButtonClick}> Verify</button>
                                
            </div>
       </div>
       
    );
}
 
export default TwoFactorView;