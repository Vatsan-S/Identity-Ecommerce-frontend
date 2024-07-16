import axios from "axios";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartCard = ({ ele, index, setCount, defaultCount, currentUser }) => {
  const [value, setValue] = useState(defaultCount[index].count);
  const handleChange = (value) => {
    console.log(value);
    // setCount({ value: value, index: index });
  };

  // =========================================handling increment=========================================
  const handleIncrement = () => {
    const newValue = value + 1;
    setValue(newValue);
    setCount({ value: newValue, index: index });
  };
  const handleDecrement = () => {
    const newValue = value - 1;
    setValue(newValue);
    setCount({ value: newValue, index: index });
  };

  // =========================================handling remove==============================================
  const handleRemove = async () => {
    const payload = {
      userID: currentUser._id,
      productID: ele._id,
    };
    await axios
      .post("http://localhost:4000/api/user/remove_from_cart", payload)
      .then((res) => {
        console.log(res);
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="cartCard">
      <div className="cartCardImage">
        <img className="cartCardImagePreview" src={ele.image1} alt="" />
      </div>
      <div className="cartCardContent">
        <h1 className="cartCardTitle">{ele.title}</h1>
        {ele.stock < 1 ? (
          <h5 className="stock red">Out of Stock</h5>
        ) : ele.stock < 10 ? (
          <h5 className="stock orange">
            Limited Stocks: Only {ele.stock} available
          </h5>
        ) : (
          <h5 className="stock green">In Stock</h5>
        )}
      </div>
      <div className="cartCardCount">
        <h5>Rs. {ele.price}</h5>
        <button onClick={handleDecrement} className="IncreButton" disabled={value < 2}>
          -
        </button>
        <input
        className="input"
          type="number"
          min="1"
          max={ele.stock}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button onClick={handleIncrement} className="IncreButton" disabled={value >= ele.stock}>
          +
        </button>

        <button className="removeButton" onClick={handleRemove}>
          <RiDeleteBin6Line /> Remove
        </button>
      </div>
    </div>
  );
};

export default CartCard;
