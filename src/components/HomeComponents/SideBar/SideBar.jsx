import "./SideBar.css"
import { useNavigate } from "react-router-dom";

import bag from "../../../Images/bag.png"
import cake from "../../../Images/cake.png"
import cupcake from "../../../Images/cupcake.png"
import { useState } from "react";
import Modal from "../../Util/Modal/Modal";
import Menu from "../Menu/Menu";


const SideBar = () => {
    const navigate = useNavigate()
    const [modal,setModal] = useState(false);
    const [menu,setMenu] = useState('')

    const handleOrderClick = () => {
        navigate('/order');
    }

    const handleCakeMenu = (e) => {
        setMenu(e.target.id);
        setModal(true);
    }
    

    const handleModal = () =>{
        modal ? (setModal(false)):setModal(true);
    }

    return (
     <>
        <Modal title={menu + ' Menu'} modal = {modal} onClose ={handleModal} >
                <Menu type = {menu} close = {handleModal} mobile = {true}/>
        </Modal>
        <div className="sidebar">
            <button className = 'sidebar-button' onClick={handleOrderClick}>
                <img src= {bag}/>
            </button>
            <button className = 'sidebar-button'>
                <img src= {cake} id = 'Cakes' onClick = {handleCakeMenu}/>
            </button>
            <button className = 'sidebar-button'>
                <img src= {cupcake} id = 'Cupcakes' onClick = {handleCakeMenu} />
            </button>
            <button className = 'sidebar-button' 
            onClick={()=> window.location.href = 'https://www.instagram.com/blue_fox_bakery/?hl=en'}>
            Instagram</button>
        </div>
        </>
    )
}

export default SideBar;