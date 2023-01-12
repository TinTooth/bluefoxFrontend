import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx"
import { useNavigate, Link } from "react-router-dom";
import ItemList from "../../components/OrderComponents/ItemsList/ItemList.jsx";
import OrderForm from "../../components/OrderComponents/OrderForm/OrderForm.jsx";
import "./OrderPage.css"



const OrderPage = () => {

    const [items, setitems] = useState([]);
    const navigate = useNavigate();


    return (
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
        
    )

}
 
export default OrderPage;