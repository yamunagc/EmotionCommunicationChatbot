import React, { useState } from 'react'
import './LoginSignup.css'
import {assets} from '../../assets/assets'

const LoginSignup = () => {

const [action, setAction] = useState("Login");

  return (
    <div className="signup-container">
      <div className="header">
            <div className="text"><span>{action}</span></div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            {action==="Login"?<div></div>:
                <div className="input">
                <img src={assets.person_icon} alt="" />
                <input type="text" placeholder= "Name" />
            </div>}
            <div className="input">
                <img src={assets.email_icon} alt="" />
                <input type="email" placeholder= "Email Id"  />
            </div>
            <div className="input">
                <img src={assets.password_icon} alt="" />
                <input type="password" placeholder='Password' />
            </div>
        </div>
        {action==="Sign up"?<div></div>:<div className="forgot-password">Lost Password? <span>Click Here</span></div>}
        
        <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign up")}}><span>Sign up</span></div>
            <div className={action==="Sign up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}><span>Login</span></div>
        </div>
    </div>
  );
};

export default LoginSignup;
