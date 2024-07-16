import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Resetpassword = () => {
  const { email,id } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg,setMsg]=useState('')
const navigate = useNavigate()

  // ============================================================useNavigate====================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword != confirmPassword) {
      return setMsg("Password does not match");
    }
    const payload = {
      id: id,
      email: email,
      newPassword: newPassword
    };
    await axios.post('https://identity-ecommerce-backend.onrender.com/api/user/reset_password',payload)
    .then((res)=>{
      console.log(res)
      navigate('/login')
    })
    .catch((err)=>{
      console.log(err.response.data.message)
      setMsg(err.response.data.message)
    })
    
  };
  return (
    <div className="container">
      <div className="content">
      <h1 className="formTitle">Reset</h1>
      <p className="errorMessage">{msg}</p>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="formSubmit" type="submit">
          Submit
        </button>
      </form>
      </div>
      
    </div>
  );
};

export default Resetpassword;
<h1>Reset</h1>;
