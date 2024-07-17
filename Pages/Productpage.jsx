import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Productpage = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [previewImg, setPreviewImg] = useState("");
  const [about, setAbout] = useState([]);
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const [cartlist, setCartlist] = useState([]);
  function handle(){
    console.log(working)
  }
  // ========================================fetch product details===============================
  const fetchProductDetails = async () => {
    if (currentUser != null) {
      const payload = {
        id: id,
        userID: currentUser._id,
      };

      await axios
        .post("https://identity-ecommerce-backend.onrender.com/api/products/product_details", payload)
        .then((res) => {
          // console.log(res.data.result);
          setProductDetails(res.data.result);
          setAbout(res.data.result.about.split("<br>"));
          if(res.data.userDetail.cartlist){
            setCartlist(res.data.userDetail.cartlist);
          }
          
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const payload = {
        id: id,
      };

      await axios
        .post("https://identity-ecommerce-backend.onrender.com/api/products/product_details", payload)
        .then((res) => {
          // console.log(res.data.result);
          setProductDetails(res.data.result);
          setAbout(res.data.result.about.split("<br>"));
          if(res.data.userDetail.cartlist){
            setCartlist(res.data.userDetail.cartlist);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  //  =========================================checking Cart List==================================

  const fetchCartDetails = (cartlist) => {
    cartlist.forEach((ele) => {
      if (ele.id == id) {
        setAlreadyInCart(true);
      }
    });
  };

  useEffect(() => {
    fetchCartDetails(cartlist);
  }, [cartlist]);
  // =======================================handle add to cart click =======================================
  const handleAddToCart = async () => {
    console.log("Working");
    // console.log(productDetails.stock);
    if (productDetails.stock > 0) {
      const payload = {
        productID: id,
        userID: currentUser._id,
        count: 1,
        //count:1 as default and in cart section count value changes based on input
      };
      await axios
        .post("https://identity-ecommerce-backend.onrender.com/api/products/add_to_cart", payload)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Out of stock");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="banner">
        <div className="bannerHalf1">
          <div className="imageCollection">
            <div
              className="imgContainer img1"
              onClick={() => setPreviewImg(productDetails.image1)}
            >
              <img
                className="img"
                src={productDetails.image1}
                alt={productDetails.title}
              />
            </div>
            <div
              className="imgContainer img2"
              onClick={() => setPreviewImg(productDetails.image2)}
            >
              <img
                className="img"
                src={productDetails.image2}
                alt={productDetails.title}
              />
            </div>
            <div
              className="imgContainer img3"
              onClick={() => setPreviewImg(productDetails.image3)}
            >
              <img
                className="img"
                src={productDetails.image3}
                alt={productDetails.title}
                onClick={() => setPreviewImg(productDetails.image3)}
              />
            </div>
            <div
              className="imgContainer img4"
              onClick={() => setPreviewImg(productDetails.image4)}
            >
              <img
                className="img"
                src={productDetails.image4}
                alt={productDetails.title}
                onClick={() => setPreviewImg(productDetails.image4)}
              />
            </div>
            <div
              className="imgContainer img5"
              onClick={() => setPreviewImg(productDetails.image5)}
            >
              <img
                className="img"
                src={productDetails.image5}
                alt={productDetails.title}
                onClick={() => setPreviewImg(productDetails.image5)}
              />
            </div>
          </div>
          <div className="imagePreview">
            <img
              className="previewImg"
              src={previewImg == "" ? productDetails.image1 : previewImg}
              alt=""
            />
          </div>
        </div>
        <div className="bannerHalf2">
          <h className="textLink">{productDetails.category}</h>
          <h1 className="bannerTitle productBannerTitle">
            {productDetails.title}
          </h1>
          <p className="textLink">
            Seller: <span className="boldText">{productDetails.seller}</span>
          </p>
          <div className="pricebox">
            <p className="priceText">
              Price:{" "}
              <span className="boldText red">{productDetails.price}</span>
            </p>
          </div>
          {alreadyInCart ? (
            <button className="alreadyInCart">Added in Cart</button>
          ) : (
            productDetails.stock < 1 || currentUser == null? <button className="alreadyInCart">
            Add to Cart
          </button>:<button className="addToCart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          )}

          {productDetails.stock < 1 ? (
            <h5 className="stock red">Out of Stock</h5>
          ) : productDetails.stock < 10 ? (
            <h5 className="stock orange">
              Limited Stocks: Only {productDetails.stock} available
            </h5>
          ) : (
            <h5 className="stock green">In Stock</h5>
          )}
        </div>
      </div>
      <hr className="seperator" />
      <div className="otherInformation">
        <h4 className="detailsTitle">About</h4>

        <ul>
          {about.map((ele, index) => {
            return <li key={index}>{ele}</li>;
          })}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Productpage;
