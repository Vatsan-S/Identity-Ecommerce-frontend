import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInstart, signInSuccess } from '../Redux/Slice/userSlice';
import Navbar from '../Components/Navbar';

const Login = () => {
    const [email, setEmail]=useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg]= useState('')
    const dispactch = useDispatch()
    const navigate = useNavigate()


    // ==================================handling Submit======================
    const handleSubmit = async(e)=>{
        e.preventDefault()
        dispactch(signInstart())
        const payload = {
            email:email,
            password:password
        }
        await axios.post('http://localhost:4000/api/user/login',payload)
        .then((res)=>{
            console.log(res.data.selectedUser)
            dispactch(signInSuccess(res.data.selectedUser))
            localStorage.setItem("Token",res.data.token)
            navigate('/')
        })
        .catch(err=>{
            console.log(err.response.data.message)
            setMsg(err.response.data.message)
        })
    }
    return (
        <div>
            <Navbar/>
        <div className='container'>
            <div className="content">
                <h1 className='formTitle'>Login</h1>
                <p className='errorMessage'>{msg}</p>
                <form onSubmit={handleSubmit} className='form'>
                <input type="email" placeholder='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder='password' name='password' value={password} onChange={((e)=>setPassword(e.target.value))} />
                <button type='submit'>Submit</button>
                <Link to='/forgotpassword' className='linkingText'>Forgot Password?</Link>
            </form>
            <Link to='/register' className='linkingText'>New here? <span className='boldText'>Register</span></Link>
            </div>
            
            
            
            
        </div>
        </div>
    );
};

export default Login;