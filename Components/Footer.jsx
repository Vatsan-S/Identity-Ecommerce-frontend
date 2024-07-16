import React from "react";
import { SiAmazongames } from "react-icons/si";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="footerContent">
        <div className="footerLeftHalf">
        <img className="logo fLogo" src="https://res.cloudinary.com/ddycjnke1/זהות_covnse" alt="" />
        <p className="slogan">DEFINE IT</p>
          <p className="address">123 Pollachi, CBE 642001 IN</p>
        </div>
        <div className="footerRightHalf">
            <h4>Links</h4>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/cart'>Cart</Link></li>
                <li>Contact Us</li>
                <li>Careers</li>
            </ul>
        </div>
      </div>
      <div className="copyRights">
        <hr />
        <p>© 2024, Vatsan, Inc. or its affiliates</p>
      </div>
    </div>
  );
};

export default Footer;
