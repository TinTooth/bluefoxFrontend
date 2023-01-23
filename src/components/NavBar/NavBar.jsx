import React from "react";
import { useNavigate, Link } from "react-router-dom";
import useCheckWidth from "../../hooks/useCheckWidth";
import "./NavBar.css";

const Navbar = () => {
  const screenSize = useCheckWidth()
  const navigate = useNavigate();


  return screenSize.width >= 1000 ? (
    <div className="navBar">
      <ul>
        <li className="brand lob2">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Blue Fox Bakery</b>
          </Link>
        </li>
        <li>
        {screenSize.width >= 1000 ? ( 
          <button  className = "lob2" onClick={()=> window.location.href = 'https://www.instagram.com/blue_fox_bakery/?hl=en'}>Instagram</button>
        ):null}
        
        </li>
      </ul>
    </div>
  ) :
  <>
  <div className="navBar-mobile">
  <ul>
    <li className="brand lob2">
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <b>Blue Fox Bakery</b>
      </Link>
    </li>
    <li>
    {screenSize.width >= 1000 ? ( 
      <button  className = "lob2" onClick={()=> window.location.href = 'https://www.instagram.com/blue_fox_bakery/?hl=en'}>Instagram</button>
    ):null}
    
    </li>
  </ul>
</div>
<div className="hidden"></div>
  </>
};

export default Navbar;
