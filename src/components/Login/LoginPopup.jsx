import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPopup = () => {
    const [currState, setCurrState] = useState("Login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState(""); // State for role selection
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post('http://localhost:4000/login', form);
            if (response.data.success) {
                setToken(response.data.token);
                console.log("Received Token:", response.data.token); // Log the token
                toast.success(response.data.message);
                navigate('/courseHome'); // Navigate to courseHome page on successful login
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        const form = {
            name: name,
            email: email,
            password: password,
            role: role // Include role in form data
        };

        try {
            const response = await axios.post('http://localhost:4000/register', form);
            if (response.data.success) {
                setToken(response.data.token);
                console.log("Received Token:", response.data.token); // Log the token
                toast.success(response.data.message);
                setCurrState('Login'); // Switch to Login state
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className='login-popup'>
            <ToastContainer />
            <div className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                </div>
                <form onSubmit={currState === "Login" ? handleLogin : handleRegister}>
                    <div className='login-popup-inputs'>
                        {currState === "Login" ? null : (
                            <>
                                <input
                                    type='text'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='Your name'
                                    required
                                />
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="">Select Role</option>
                                    <option value="Student">Student</option>
                                    <option value="Admin">Teacher</option>
                                </select>
                            </>
                        )}
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
                    <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                    <div className='login-popup-condition'>
                        <input type='checkbox' required />
                        <p>By continuing, I agree to the terms of use & privacy policy</p>
                    </div>
                    {currState === 'Login'
                        ? <p style={{ fontSize: '15px' }}>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                        : <p style={{ fontSize: '15px' }}>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                    }
                </form>
            </div>
        </div>
    );
}

export default LoginPopup;
