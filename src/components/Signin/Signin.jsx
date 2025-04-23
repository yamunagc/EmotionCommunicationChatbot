import React from 'react'
import './Signin.css'
import {assets} from '../../assets/assets'

const Signin = () => {

  return (
    <div className="signin-container">
        <div className="header">
            <div className="text"><span>Sign in</span></div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            {/* {action==="Login"?<div></div>: */}
                <div className="input">
                <img src={assets.person_icon} alt="" />
                <input type="text" placeholder= "Username" />
            </div>
            {/* <div className="input">
                <img src={assets.email_icon} alt="" />
                <input type="email" placeholder= "Email Id"  />
            </div>
            <div className="input">
                <img src={assets.password_icon} alt="" />
                <input type="password" placeholder='Password' />
            </div> */}
        </div>
        {/* {action==="Sign up"?<div></div>:<div className="forgot-password">Lost Password? <span>Click Here</span></div>} */}
        
        <div className="submit-container">
            <div className="submit">Submit</div>
        </div>
    </div>
  );
};

export default Signin;
