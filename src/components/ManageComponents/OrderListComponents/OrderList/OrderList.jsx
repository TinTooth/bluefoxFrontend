import { useEffect, useState } from "react";
import useDate from "../../../../hooks/useDate"
import ManageOrderStatus from "../ManageOrderStatus/ManageOrderStatus";
import Table from 'react-bootstrap/Table';

const OrderList = ({orders, filter, setcurrentOrder, getOrders, selectedDate}) => {
    const [filteredOrders, setfilteredOrders] = useState([]);
    const [getDateString,getWeekWorkTime,getLikelihood,getWorkTime, getMonth, getDay] = useDate()
    
    useEffect(() => {
        filterOrders();
    },[orders,selectedDate])

    const filterOrders = () => {
        let results = orders.filter(o => o.status === filter && o.deliver_date[5] === selectedDate[5] && o.deliver_date[6] === selectedDate[6])
        setfilteredOrders(results)
    }

  
    return filteredOrders.length ? ( 
        <div className="table">
            <div className="t-row head">
                    <div className="nr-cell"> # </div>
                    <div className="c-cell"> Customer </div>
                    <div className="d-cell"> Date </div>
                    <div className="b-cell pink"> {filter} Orders</div>
            </div>
            <div className="data">
                {  filteredOrders.map((o,i) => {
                    return (
                        <div className="t-row" key = {i} >
                           <ManageOrderStatus order = {o} getOrders = {getOrders} filter = {filter} setcurrentOrder = {setcurrentOrder}/>
                        </div>
                    )
                } )
                }
            </div>
        </div>
     ):
     <div className="table">
                 <div className="t-row head">
                    <div className="n-cell"> # </div>
                    <div className="c-cell"> Customer </div>
                    <div className="d-cell"> Date </div>
                    <div className="b-cell"> {filter} Orders</div>
            </div>
           <div className="no-data">No {filter} Orders for {getMonth(selectedDate)}</div>
        </div> ;
}
 
export default OrderList;