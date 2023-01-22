import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useCheckWidth from "../../hooks/useCheckWidth";
import "./NavBar.css";

const Navbar = () => {
  const screenSize = useCheckWidth()
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
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
  );
};

export default Navbar;
