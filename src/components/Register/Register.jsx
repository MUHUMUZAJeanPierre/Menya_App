import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../LoginPopup/Login.css'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        const form = { name, email, password, role };
        try {
            await axios({
                method: 'post',
                url: 'http://localhost:4000/register',
                data: form,
            }).then((response) =>{
                setTimeout(()=>{
                    console.log(response.data);
                    navigate('/login'); 
                    toast.success(response.data.message);
                }, 3000)
            })
        } catch (error) {
            console.error(error);
        }

        // try {
        //     const response = await axios.post('http://localhost:4000/register', form);
        //     if (response.data.success) {
        //         setTimeout(()=>{
        //             navigate('/login'); // Navigate to login page when registration is successful
        //             toast.success(response.data.message);
        //         }, 3000)
        //     } else {
        //         toast.error(response.data.message);
        //     }
        // } catch (error) {
        //     toast.error('An error occurred. Please try again.');
        // }
    };

    return (
        <div className='login-popup'>
            <ToastContainer />
            <div className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>Register</h2>
                </div>
                <form onSubmit={handleRegister}>
                    <div className='login-popup-inputs'>
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
                    <button type='submit'>Create account</button>
                    <div className='login-popup-condition'>
                        <input type='checkbox' required />
                        <p>By continuing, I agree to the terms of use & privacy policy</p>
                    </div>
                    <p style={{ fontSize: '15px' }}>
                        Already have an account? <span onClick={() => navigate("/login")}>Login here</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
