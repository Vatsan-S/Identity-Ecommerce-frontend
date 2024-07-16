import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInFailure, signInstart, signInSuccess } from "../Redux/Slice/userSlice";
import Navbar from "../Components/Navbar";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg,setMsg]= useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {loading} = useSelector((state)=>state.user)
  // ==============handling Submit of form============
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInstart())
    const payload = {
      username: username,
      email: email,
      password: password,
      role:"User" 
    };

    await axios
      .post("https://identity-ecommerce-backend.onrender.com/api/user/register", payload)
      .then((res) => {
        console.log(res.data.message);
        dispatch(signInSuccess(null))
        navigate("/login");

      })
      .catch((err) => {
        console.log(err)
        setMsg(err.response.data.message)
        dispatch(signInFailure(err))
      });
  };
  return (
    <div>
      <Navbar/>
    
    <div className="container">
      <div className="content">
        <h1 className="formTitle">Register</h1>
        <p className="errorMessage">{msg}</p>
        <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>{loading?("loading..."):("Submit")}</button>
      </form>
      
      <Link to='/login' className='linkingText'>Already a user? <span className='boldText'>Login</span></Link>
      </div>
      
      
      
    </div>
    </div>
  );
};

export default Register;
