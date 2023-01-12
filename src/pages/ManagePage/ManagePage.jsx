import axios from "axios";
import useConfig from "../../hooks/useConfig";
import { useState,useEffect } from "react";
import ManageOrdersLists from "../../components/ManageComponents/OrderListComponents/ManageOrdersLists/ManageOrdersLists";
import Manager from "../../components/ManageComponents/ManagerComponents/Manager/Manager";
import "./ManagePage.css"
import WorkCalendar from "../../components/ManageComponents/CalendarComponents/WorkCalendar/WorkCalendar";
import NavBar from "../../components/NavBar/NavBar.jsx"
import WorkTimeCounter from "../../components/ManageComponents/CalendarComponents/WorkTimeCounter/WorkTimeCounter";
import "./ManagePage.css"
import Footer from "../../components/Footer/Footer.jsx"

const ManagePage = () => {
    const config = useConfig();
    const [orders, setorders] = useState([]);
    const [items, setitems] = useState();
    const [currentOrder, setcurrentOrder] = useState({id:0});
    const [selectedDate, setselectedDate] = useState(new Date().toJSON().slice(0, 10));

    useEffect (()=> {
        getOrders();
    
    },[]) 

    useEffect(()=> {
        getItems();
    },[orders])

    
    async function getOrders() {
        let response = await axios.get("http://127.0.0.1:8000/api/order/",config)
        setorders(response.data)
    }

    async function getItems() {
        let response = await axios.get('http://127.0.0.1:8000/api/order/1/items/all',config)
        setitems(response.data)
    }

    return (
        <>
        <NavBar/>
        <div className="page-container">
            <div className="manage-row gap">
                {items ?(<WorkTimeCounter selectedDate={selectedDate} items = {items}/>):null}
                <WorkCalendar orders = {orders} setcurrentOrder = {setcurrentOrder} setSelectedDate = {setselectedDate}/>
                <ManageOrdersLists selectedDate={selectedDate} orders = {orders} getOrders = {getOrders} setcurrentOrder = {setcurrentOrder}/>
            </div>
            <Manager currentOrder={currentOrder} getOrders = {getOrders} orders = {orders}/>
            <Footer/>
            <Footer/>
            <Footer/>
        </div>
        </>
      );
}
 
export default ManagePage;