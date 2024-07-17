import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Footer from "../Components/Footer";
import Loading from '../Components/Loading'

const Home = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  // ===============================fetch products============================
  const fetchProducts = async () => {
    await axios
      .get(
        "https://identity-ecommerce-backend.onrender.com/api/products/fetch_products"
      )
      .then((res) => {
        // console.log(res.data.result)
        setProductList(res.data.result);
        // console.log(productList)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  //   ==================================handle card click==============================
  const handleCardClick = async (productID) => {
    navigate(`/product_details/${productID}`);
  };
  return (
    <div>
      <Navbar />

      <Banner />
      {loading && <Loading/>}
      <div className="cardsSection">
        {productList.map((ele, index) => {
          return (
            <div className="cardContainer" key={index}>
              <div
                key={index}
                className="cards"
                onClick={() => handleCardClick(ele._id)}
              >
                <div className="imageSection">
                  <img src={ele.image1} alt="" />
                </div>
                <div className="contentSection">
                  <h3>{ele.tagname}</h3>
                  <p>Rs. {ele.price}</p>
                  {ele.stock < 1 ? (
                    <p className="stockCard red">Out of Stock</p>
                  ) : ele.stock < 10 ? (
                    <p className="stockCard orange">
                      Only {ele.stock} available
                    </p>
                  ) : (
                    <p className="stockCard green">In Stock</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
