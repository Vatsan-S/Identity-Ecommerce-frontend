import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BarChart from "../Components/Chart";
import Navbar from "../Components/Navbar";
import PieChart from "../Components/PieChart";
const Dashboard = () => {
  const [productList, setProductList] = useState([]);
  const [modal, setModal] = useState(false);
  // =============================config sales data======================================
  const [bestPerforming, setBestPerforming] = useState([]);
  const [worstPerforming, setWorstPerforming] = useState([]);
  const [totalSales, setTotalSales] = useState();
  const [salesData, setSalesData] = useState([]);
  const [statLoading, setStatLoading] = useState(false);

  //   ===========================states for edit modal=======================================
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [img5, setImg5] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [availability, setAvailability] = useState();
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");
  const [seller, setSeller] = useState("");
  const [stock, setStock] = useState();
  const [id, setId] = useState("");

  //===========================================fetch sales data===============================

  const fetchSalesData = async () => {
    setStatLoading(true);
    await axios
      .get("https://identity-ecommerce-backend.onrender.com/api/sales/sales_data")
      .then((res) => {
        console.log(res.data);
        setTotalSales(res.data.totalSales[0].totalRevenue);
        setBestPerforming(res.data.topSellingProducts);
        setWorstPerforming(res.data.worstPerforming);
        setSalesData(res.data.categorySales);
        setStatLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // =========================================fetch products===================================
  const fetchProducts = async () => {
    await axios
      .get("https://identity-ecommerce-backend.onrender.com/api/products/fetch_products")
      .then((res) => {
        // console.log(res.data.result)
        setProductList(res.data.result);
        // console.log(productList)
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  useEffect(() => {
    fetchProducts();
    fetchSalesData();
  }, []);

  // ========================================handle delete=========================================
  const handleDelete = async (productID) => {
    const payload = {
      productID: productID,
    };
    await axios
      .post("https://identity-ecommerce-backend.onrender.com/api/products/delete_product", payload)
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // =======================================handle edit=================================================
  const handleEdit = async (product) => {
    setModal(true);
    setTitle(product.title);
    setImg1(product.image1);
    setImg2(product.image2);
    setImg3(product.image3);
    setImg4(product.image4);
    setImg5(product.image5);
    setPrice(product.price);
    setAvailability(product.availability);
    setCategory(product.category);
    setAbout(product.about);
    setSeller(product.seller);
    setStock(product.stock);
    setId(product._id);
  };

  //   ==========================================handle edit submit====================================
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: title,
      image1: img1,
      image2: img2,
      image3: img3,
      image4: img4,
      image5: img5,
      price: price,
      availability: availability,
      category: category,
      about: about,
      seller: seller,
      stock: stock,
      id: id,
    };
    await axios
      .post("https://identity-ecommerce-backend.onrender.com/api/products/edit_product", payload)
      .then((res) => {
        console.log(res);
        console.log("Success");
        setModal(false);
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // ============================================test

  //   =====================================jsx============================================
  return (
    <div>
      <Navbar />
      <div className="titlecontainerDashboard">
        <h1 className="titleDashboard">Dashboard</h1>
        <hr />
      </div>
      <div className="dashboardContent">
        <Link to="/create_product" className="btnCrtProduct button">
          Create Product
        </Link>
        <Link to="/create_seller" className="btnCrtSeller button">
          Create Seller
        </Link>
        {/* <p>totalSales:{totalSales}</p>
      <p>Top selling</p> */}
        <div className="charts">
          <div className="chartBase">
            <BarChart className="chartItem" color={"green"} title={"Top Performing Products - This month"} bestPerforming={bestPerforming} />
          </div>
          <div className="chartBase">
            <BarChart className="chartItem" color={"red"} title={"Worst Performing Products - This month"} bestPerforming={worstPerforming} />
          </div>
          <div className="chartBase">
            <PieChart className="chartItem" data={salesData} />
          </div>
        </div>

        {/* ================================================stats area============================================= */}
        <div className="product-list-container">
          <table className="product-table">
            <thead>
              <tr>
                <th className="display" >S.no</th>
                <th className="display">Title</th>
                <th className="display">Images</th>
                <th className="display">Price</th>
                <th>Tag name</th>
                <th className="display">Category</th>
                <th className="display">Description</th>
                <th className="display">Seller</th>
                <th className="display">Stock</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((ele, index) => (
                <tr key={index}>
                  <td className="display">{index + 1}</td>
                  <td className="display"> <div className="description"> {ele.title}</div></td>
                  <td className="display">
                    <img
                      src={ele.image1}
                      alt="Product"
                      className="product-image"
                    />
                  </td>
                  <td className="display">${ele.price}</td>
                  <td >{ele.tagname}</td>
                  <td className="display">{ele.category}</td>
                  <td className="display"> <div className="description">{ele.about}</div> </td>
                  <td className="display">{ele.seller}</td>
                  <td className="display">{ele.stock}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(ele)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(ele._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal */}
          {modal && (
            <div className="modal">
              <div className="modal-content">
                <h2>Edit Product</h2>
                <form onSubmit={handleEditSubmit}>
                  <label>Title:</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <label>Price:</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />

                  <label>Availability:</label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>

                  <label>Category:</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />

                  <label>Description:</label>
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>

                  <label>Seller:</label>
                  <input
                    type="text"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />

                  <label>Stock:</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />

                  <button type="submit">Submit</button>
                </form>
                <button className="close-modal" onClick={() => setModal(false)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ====================================modal ends=================================== */}
    </div>
  );
};

export default Dashboard;
