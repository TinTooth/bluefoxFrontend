import "./SideBar.css"
import { useNavigate } from "react-router-dom";

import bag from "../../../Images/bag.png"
import cake from "../../../Images/cake.png"
import cupcake from "../../../Images/cupcake.png"


const SideBar = () => {
    const navigate = useNavigate()

    const handleOrderClick = () => {
        navigate('/order');
        
    }

    return (
    <div className="sidebar">
        <button className = 'sidebar-button'onClick={handleOrderClick}>
            <img src= {bag} />
        </button>
        <button className = 'sidebar-button'>
            <img src= {cake} />
        </button>
        <button className = 'sidebar-button'>
            <img src= {cupcake} />
        </button>
        <button className = 'sidebar-button'>Instagram</button>
    </div>
    )
}

export default SideBar;