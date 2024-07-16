import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Activation = () => {
    const {id, email}= useParams()
    const navigate = useNavigate()
    const payload = {
        id:id,
        email:email
    }
    console.log(payload)
const activation = async()=>{
    await axios.post('https://identity-ecommerce-backend.onrender.com/api/user/activation',payload)
    .then((res)=>{
        console.log(res)
        navigate('/login')
    })
    .catch((err)=>console.log(err))
}

    useEffect(()=>{activation()},[])
    return (
        <div>
            <h1>Activation</h1>
        </div>
    );
};

export default Activation;<h1>Activation</h1>