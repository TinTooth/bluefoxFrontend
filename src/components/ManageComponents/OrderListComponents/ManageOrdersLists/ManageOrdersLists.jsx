import OrderList from "../OrderList/OrderList";
import "./ManageOrdersLists.css"
import useDate from "../../../../hooks/useDate";

const ManageOrderLists = ({orders,getOrders,setcurrentOrder,selectedDate}) => {
    const [getDateString,getWeekWorkTime,getLikelihood,getWorkTime, getMonth, getDay] = useDate()
    
    return orders ? ( 
        <div className="order-lists">
            <div className="list-title">Showing Orders For {getMonth(selectedDate)} </div>
            <div className="lists-container pad">
                <OrderList orders = {orders} filter = "Accepted" selectedDate={selectedDate}
                    setcurrentOrder = {setcurrentOrder} getOrders ={getOrders}  />
                <OrderList orders = {orders} filter = "Pending" selectedDate={selectedDate}
                    setcurrentOrder = {setcurrentOrder}  getOrders ={getOrders}/>
                <OrderList orders = {orders} filter = "Rejected"selectedDate={selectedDate}
                     setcurrentOrder = {setcurrentOrder}  getOrders ={getOrders}/>
            </div>
        </div>
     ): null;
}
 
export default ManageOrderLists;