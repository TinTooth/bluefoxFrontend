import axios from "axios";
import useConfig from "../../../../hooks/useConfig";


const ManageOrderStatus = ({order,filter,getOrders, setcurrentOrder}) => {
    const config = useConfig();
    
    async function putOrder(e) {
        order.status = e.target.id;
        console.log(order.status)
        const response = await axios.put(`http://127.0.0.1:8000/api/order/${order.id}/`,order,config);
            getOrders();
        
    }

    const handleClick = () => {
        setcurrentOrder(order);
    }


    return (  
        <>
            <div className="n-cell" onClick = {handleClick}> {order.id}</div>
            <div className="c-cell"> {order.user.last_name}</div>
            <div className="d-cell"> {order.deliver_date.slice(5)} </div>
            
            {  filter === 'Pending' ? (
                <div className="b-cell">
                <button id = 'Accepted' onClick = {putOrder}>Accept</button>
                <button id = 'Rejected' onClick = {putOrder}>Reject</button>
                
                </div>
                ): filter === 'Accepted' ? (
                    <div className="b-cell">
                <button id = 'Pending' onClick = {putOrder}>Pending</button>
                <button id = 'Rejected' onClick = {putOrder}>Reject</button>
                </div> 
                ):
                <div className="b-cell">
                <button id = 'Accepted' onClick = {putOrder}>Accept</button>
                <button id = 'Pending' onClick = {putOrder}>Pending</button>
                </div> 
            }
        </>
        
    );
}
 
export default ManageOrderStatus;