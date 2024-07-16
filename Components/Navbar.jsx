import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { SiAmazongames } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../Redux/Slice/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import Searchbar from "./Searchbar";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [dropdown, setDropdown] = useState(false);

  const handleSignOut = () => {
    dispatch(signOutSuccess());
    location.reload();
  };
  return (
    <div className="navbarContainer">
      <div className="iconsAndButtons">
        <Link to="/">
          <div >
          <img className="logo" src="https://res.cloudinary.com/ddycjnke1/זהות-1_lmtgdd" alt="" />
          <p className="slogan">DEFINE IT</p>
          </div>
        </Link>
        <div className="otherIcons">
          {currentUser ? (
            <button
              className="navButton"
              onClick={() => setDropdown(!dropdown)}
            >
              {currentUser.username}
              <MdArrowDropDown />
            </button>
          ) : (
            <button className="navButton" onClick={() => navigate("/login")}>
              SignIn
            </button>
          )}
          {dropdown && (
            <div className="dropdown">
              <div>
                <p onClick={handleSignOut}>Sign Out</p>
              </div>
              <div>
                {currentUser.role == "admin" && (
                  <Link to="/dashboard">
                    <p>Dashboard</p>
                  </Link>
                )}
              </div>
            </div>
          )}
          <IoCartOutline onClick={() => navigate("/cart")} />
        </div>
      </div>
      <div className="search">
        <Searchbar />
      </div>
    </div>
  );
};

export default Navbar;
