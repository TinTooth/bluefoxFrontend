import ItemList from "../ItemsList/ItemList";
import useAuth from "../../../hooks/useAuth";
import useDate from "../../../hooks/useDate";
import "./OrderConfirmation.css"
import { useState, useEffect } from "react";
import axios from "axios";
import useConfig from "../../../hooks/useConfig";



const OrderConfirmation = ({order,items, close}) => {
    const [user] = useAuth();
    const [likelihoodString, setlikelihoodString] = useState('Click Here');
    const [getDateString,getWeekWorkTime,getLikelihood,getWorkTime] = useDate();
    const [allItems, setAllItems] = useState([]);
    const config = useConfig();

    useEffect (() => {
        getItems()
    },[])

    useEffect (() => {
        getLikelihoodString()
    },[allItems])

    const getLikelihoodString = () => {
        setlikelihoodString(getLikelihood(getWeekWorkTime(order.deliver_date,allItems) + getWorkTime(items)));  
    }

    async function getItems() {
        let response = await axios.get('http://127.0.0.1:8000/api/order/1/items/all',config)
        setAllItems(response.data)
    }


    return ( 
        <div className="confirmation-container">
            {/* <div className="title">Order Confrimation</div> */}
            <div className="order-details-container">
                <div>
                    <div className="title lob2"> {user.first_name}'s Order</div>
                    
                </div>
                <ItemList items = {items} noRemove = {true}/>
            </div>
            <div className="order-details-container">
                    {/* <div className="detail"></div> */}
                    <div className="order-detail2"> Order Number:  {order.id}</div>
                    <div className="order-detail2"> Order Date:  {getDateString(order.deliver_date)}</div>
                    <div className="order-divider"></div>
                <div className="order-message">Write down the Order Number for future reference!</div>
                {/* <div className="order-message">Thank you for the order request</div> */}
                <div className=" order-message likelihood mt">{likelihoodString}</div>
                <div className=" order-message likelihood mb">Either Way, She will reach out soon to let you know</div>

                <div className="order-message"> All goods baked in a Private Home under WI Cottage Food</div>
                <div className="order-message"> It is not a nut-free facility</div>
                <div className="order-divider"></div>
                <button onClick={()=> window.location.reload(false)}>New Order</button>
                <button onClick={()=> window.location.href = 'https://www.instagram.com/blue_fox_bakery/?hl=en'}>Instagram</button>
            </div>
        
        </div>
     );
}
 

export default OrderConfirmation;