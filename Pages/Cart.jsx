import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartCard from "../Components/CartCard";
import { billingList } from "../Redux/Slice/productSlice";
import Navbar from '../Components/Navbar';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [count, setCount] = useState({});
  const [defaultCount, setDefaultCount] = useState([])
  const [billingData, setBillingData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  // ===============================fetch products from db to cart=============================
  const fetchCartProducts = async () => {
    const payload = {
      userID: currentUser._id,
    };
// console.log(currentUser._id)
    await axios
      .post("http://localhost:4000/api/user/cart_products", payload)
      .then((res) => {
        // console.log("Count",res.data.countData)
        // console.log("sorted",res.data.result)
        // console.log("cartlist",res.data.cartlist)
        setDefaultCount(res.data.countData)
        setCartItems(res.data.result);
       
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);
  // =============================================updatimgCount=========================================
  const updateCount = async (count) => {
    
    const payload = {
      value: count.value,
      index: count.index,
      currentUser: currentUser._id,
    };
    await axios.post("http://localhost:4000/api/user/cart_list_count", payload)
    .then((res)=>{
      setDefaultCount(res.data.countData)
      // console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
    
  };

  useEffect(() => {
    updateCount(count);
    
  }, [count]);

  // =======================================handle buy now click=======================================
  const handleBuyNow = async () => {
    let allAvailable = cartItems.filter((ele) => {
      return ele.stock < 1;
    });
    if (allAvailable.length > 0) {
      console.log(
        "Cannot proceed buying because one of the product is out of stock"
      );
    } else {
      dispatch(billingList({cartItemsCountData:defaultCount,cartListItems:cartItems}))
      // console.log("Items bought");
      navigate("/bill");
    }
  };
  return (
    <div className="cartContainer">
      <Navbar/>
      
      <div className="cartContent">
        <div className="cartContentTitle">
        <h1 className="bannerTitle">cart</h1>
        <button className={cartItems.length <1?"disabledButton":"button"} disabled={cartItems.length <1} onClick={handleBuyNow}>Continue to payment</button>
        </div>
      
      <hr />
        {/* =========================================maping card items as cards============================ */}
      {cartItems.map((ele, index) => {
        return (
          <div key={index}>
            <CartCard ele={ele} index={index} setCount={setCount} count={count} defaultCount={defaultCount} currentUser={currentUser}/>
            
          </div>
        );
      })}
      </div>
      
      
      
    </div>
  );
};

export default Cart;
