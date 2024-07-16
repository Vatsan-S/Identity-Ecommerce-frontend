import axios from 'axios';
import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

const Forgotpassword = () => {
    const [email,setEmail]= useState('')
    const [state, setState] = useState(true)
    const [msg, setMsg] = useState('')
// ========================================handling Submit======================
const handleSubmit = async(e)=>{
    e.preventDefault()
    const payload = {
        email:email
    }
    await axios.post('http://localhost:4000/api/user/forgot_password',payload)
    .then((res)=>{
        console.log(res)
        setState(false)
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
                <h1 className='formTitle'>Forgot Password?</h1>
                {state?(<>
            <p className='errorMessage'>{msg}</p>
            <form onSubmit={handleSubmit} className='form'>
            <input type="email" placeholder='email' value={email} name='email' onChange={(e)=>setEmail(e.target.value)} />
            <button type='submit'>Email Me</button>
            </form>
            
            </>):(<><p className='linkingText'>Email sent</p></>)}
            </div>
            
            
        </div>
        </div>
    );
};

export default Forgotpassword;<h1>Forgot</h1>