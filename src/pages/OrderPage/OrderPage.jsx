import { useState } from "react";
import useCheckWidth from "../../hooks/useCheckWidth.js";
import NavBar from "../../components/NavBar/NavBar.jsx"
import { useNavigate, Link } from "react-router-dom";
import ItemList from "../../components/OrderComponents/ItemsList/ItemList.jsx";
import OrderForm from "../../components/OrderComponents/OrderForm/OrderForm.jsx";
import "./OrderPage.css"
import SideBar from "../../components/HomeComponents/SideBar/SideBar.jsx";



const OrderPage = () => {
    const screenSize = useCheckWidth()
    const [items, setitems] = useState([]);
    const navigate = useNavigate();


    return screenSize.width >= 1100  && screenSize.height >=700 ?(
        <>
        <NavBar></NavBar>
        <div className="b">
            <OrderForm setItems={setitems}  items = {items}/>
            <div className="item-list-container">
            <div className="spacer"></div>
             <ItemList items = {items} setItems = {setitems}></ItemList>
            </div>
        </div>
        </>  
        
    ) :
    <>
        <NavBar title = 'Order'></NavBar>
        <OrderForm setItems={setitems}  items = {items}></OrderForm>
    </>

}
 
export default OrderPage;