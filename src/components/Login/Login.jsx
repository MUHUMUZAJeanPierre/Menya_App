import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../LoginPopup/Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = { email, password };

        try {
            await axios({
                method: 'post',
                url: 'http://localhost:4000/login',
                data: form,
            }).then((response) =>{
                setToken(response.data.token);
                console.log("Received Token:", response.data);
                localStorage.setItem('userId',response.data.user.id)
                setTimeout(() => {
                    navigate('/courseHome');
                    toast.success(response.data.message);
                    alert('Logged in successfully');
                }, 3000);
            })
        } catch (error) {
            console.log(error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className='login-popup'>
            <ToastContainer />
            <div className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>Login</h2>
                </div>
                <form onSubmit={handleLogin}>
                    <div className='login-popup-inputs'>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='email'
                            placeholder='Your email'
                            required
                        />
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            required
                        />
                    </div>
                    <button type='submit'>Login</button>
                    <div className='login-popup-condition'>
                        <input type='checkbox' required />
                        <p>By continuing, I agree to the terms of use & privacy policy</p>
                    </div>
                    <p style={{ fontSize: '15px' }}>
                        Don't have an account? <span onClick={() => navigate('/register')}>Register here</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
