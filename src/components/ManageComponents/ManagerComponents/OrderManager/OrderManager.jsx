import ItemList from "../../../OrderComponents/ItemsList/ItemList";
import "./OrderManager.css"
import axios from "axios";
import useConfig from "../../../../hooks/useConfig";
import { useState,useEffect } from "react";
import Editor from "./Editor/Editor";


const OrderManager = ({show, currentOrder, getOrders}) => {
    const [orderItems,setorderItems] = useState([]);
    const [editorShow, seteditorShow] = useState(true);
    const config = useConfig();
    const [currentItem, setcurrentItem] = useState();
    

    useEffect (()=> {
        getOrderItems();
        setcurrentItem('');
    },[currentOrder])

    async function getOrderItems() {
        let response = await axios.get(`http://127.0.0.1:8000/api/order/${currentOrder.id}/items/`,config);
        setorderItems(response.data);
    }

    const showOrderEdit = () => {
        seteditorShow(true);
        setcurrentItem('')
    }


    return show ? ( 
        <div className="manager container-no-wrap">
            <div className="items-container">
                <ItemList items = {orderItems} noDetails = {true} noRemove = {true} setcurrentItem = {setcurrentItem}/>
            </div>
            <div className="editor">
                <Editor item = {currentItem} order = {currentOrder} items = {orderItems} editorShow = {editorShow}
                getItems = {getOrderItems} getOrders = {getOrders}/>
            </div>
            <div className="order-container">
                <div className="order">
                { currentOrder.id !== 0 ? (<div className="order-detail ulp"> Order # {currentOrder.id}</div>): <div className="order-detail"> Order # </div>}
                { currentOrder.id !== 0 ? (<div className="order-detail"> {currentOrder.user.first_name} {currentOrder.user.last_name}</div>):null}
                { currentOrder.id !== 0 ? (<button onClick = {showOrderEdit}>Details</button>):null}
                </div>
            </div>
        </div>


     ) :null;
}
 
export default OrderManager;