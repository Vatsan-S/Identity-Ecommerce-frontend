import axios from "axios";
import React, { useState } from "react";


const Createseller = () => {
  const [sellername, setSellername] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const payload = {
      username: sellername,
      email: sellerEmail,
      password: password,
      role: "Seller",
      activation: true,
      randomString: "",
    };
    await axios.post('https://identity-ecommerce-backend.onrender.com/api/user/register',payload)
    .then((res)=>{
        setMsg(res.data.message)
        setLoading(false)
        location.reload()
    })
    .catch((err)=>{
        setMsg(err.response.data.message)
        setLoading(false)
    })
  };
  return (
    <div className="container">
      <div className="content">
        <h1 className="formTitle">Create Seller</h1>
        <p className="errorMessage">{msg}</p>
        <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="sellername"
          placeholder="sellername"
          value={sellername}
          onChange={(e) => setSellername(e.target.value)}
          required
        />
        <input
          type="sellerEmail"
          name="sellerEmail"
          placeholder="sellerEmail"
          value={sellerEmail}
          onChange={(e) => setSellerEmail(e.target.value)}
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
        <button type="submit" disabled={loading}>
          {loading ? "loading..." : "Submit"}
        </button>
      </form>
      </div>
      
      
      
    </div>
  );
};

export default Createseller;
