import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Bill = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { cartItemsCountData, cartListItems } = useSelector(
    (state) => state.product
  );
  const navigate = useNavigate();

  //   ===========================================================calc total price of the purchase===========================================//

  let totalPrice = 0;
  for (var i = 0; i < cartListItems.length; i++) {
    const productPrice = cartItemsCountData[i].count * cartListItems[i].price;
    totalPrice += productPrice;
  }

  // ============================================================handle click to upload sales data=========================================//
  const handleClick = async () => {
    for (var i = 0; i < cartListItems.length; i++) {
      const payload = {
        productID: cartListItems[i]._id,
        customerID: currentUser._id,
        category: cartListItems[i].category,
        tagname: cartListItems[i].tagname,
        quantity: cartItemsCountData[i].count,
        price: cartItemsCountData[i].count * cartListItems[i].price,
      };
      const payload2 = {
        stock: cartListItems[i].stock - cartItemsCountData[i].count,
        id: cartListItems[i]._id,
      };
      const payload3 = {
        productID: cartListItems[i]._id,
        userID: currentUser._id,
      };
      await axios
        .post("https://identity-ecommerce-backend.onrender.com/api/sales/save_sales_data", payload)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .post("https://identity-ecommerce-backend.onrender.com/api/products/edit_product", payload2)
        .then((res) => {
          console.log(res);
          console.log("Success");
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .post("https://identity-ecommerce-backend.onrender.com/api/user/remove_from_cart", payload3)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    navigate("/");
  };

  return (
    <div className="cartContainer">
      <Navbar />

      <div className="cartContent">
        <div className="cartContentTitle">
          <h1 className="bannerTitle">Bill Summary</h1>
          <button className="button" onClick={handleClick}>
            Buy Now
          </button>
        </div>

        <hr />
        {/* =========================================maping card items as cards============================ */}
        {cartListItems.map((ele, index) => {
          return (
            <div key={index} className="billContainer">
              <div className="billLeftHalf">
                <p>{ele.title}</p>
                <p className="boldText">Rs: {ele.price}</p>
              </div>
              <div className="billRightHalf">
                <p>QTY:{cartItemsCountData[index].count}</p>
                <p>Total:{ele.price * cartItemsCountData[index].count}</p>
              </div>
            </div>
          );
        })}
        <div className="bottomCard">
        <h4>Grand Total: Rs.{totalPrice}</h4>
        </div>
      </div>
      
    </div>
  );
};

export default Bill;
