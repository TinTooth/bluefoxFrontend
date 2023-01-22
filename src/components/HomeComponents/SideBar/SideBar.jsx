import "./SideBar.css"
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate()

    const handleOrderClick = () => {
        navigate('/order');
        
    }


    return (
    <div className="sidebar">
        <button className = 'sidebar-button'onClick={handleOrderClick}>Order</button>
        <button className = 'sidebar-button'>Cake Menu</button>
        <button className = 'sidebar-button'>Cupcake Menu</button>
        <button className = 'sidebar-button'>Instagram</button>
    </div>
    )
}

export default SideBar;