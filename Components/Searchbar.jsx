import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [productList, setProductList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);
  const fetchProducts = async () => {
    await axios
      .get("http://localhost:4000/api/products/fetch_products")
      .then((res) => {
        setProductList(res.data.result);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  useEffect(() => {
    fetchProducts();

    const clickOutsideClosure = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", clickOutsideClosure);

    
  }, []);
  const handleKeyup = (value) => {
    const data = productList.filter((ele) =>
      ele.title.toLowerCase().includes(value.toLowerCase())
    );
    
    if (value.length < 1 || data.length <1) {
      setDropdown(false);
      
    } else {
      setDropdown(true);
      setFilteredData(data);
    }
    
  };

  const handleSearchClick = async (productID) => {
    navigate(`/product_details/${productID}`);
    location.reload()
  };
  return (
    <div className="searchContainer" ref={searchContainerRef}>
      <input
        type="text"
        className="searchInput"
        placeholder="Search for products"
        onKeyUp={(e) => {
          handleKeyup(e.target.value);
        }}
      />
      <button className="navButton">
        <IoMdSearch />
      </button>
      {dropdown && (
        <div className="searchDropdown">
          <div className="searchDropdownList">
            <ul>
              {filteredData.map((ele,index) => {
                return (
                  <li key={index}
                    onClick={() => {
                      handleSearchClick(ele._id);
                    }}
                  >
                    {ele.tagname}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
