import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
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
          {user && user.is_staff ? (
            <button onClick={()=> navigate('/manage')}>Manage Orders</button>
          ) : (
            null
          )}
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
