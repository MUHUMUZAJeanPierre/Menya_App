import React, { useState } from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './Login.css'

const LoginPopup = () => {
    const [currState, setCurrState] = useState("Login");

    return (
        <div className='login-popup'>
            {currState === 'Login' ? (
                <Login setCurrState={setCurrState} />
            ) : (
                <Register setCurrState={setCurrState} />
            )}
        </div>
    );
};

export default LoginPopup;
