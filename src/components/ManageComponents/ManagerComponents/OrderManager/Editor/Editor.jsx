import axios from "axios";
import { useEffect,useState } from "react";
import useConfig from "../../../../../hooks/useConfig";
import useCustomForm from "../../../../../hooks/useCustomForm.js"
import Input from "../../../../Util/Input/Input";
import Modal from "../../../../Util/Modal/Modal";
import useCalc from "../../../../../hooks/useCalc";
import "./Editor.css"

const Editor = ({item, getItems, order, items,editorShow, getOrders}) => {
    const config = useConfig();
    const [itemDeleteShow, setitemDeleteShow] = useState(false);
    const [getPrice, getWorkTime] = useCalc();
    

   
    async function putItem() {
        let response = await axios.put(`http://127.0.0.1:8000/api/order/${order.id}/items/manage/${item.id}/`,formData,config)
        getItems();
    }

    async function deleteItem() {
        console.log(item)
        let response = await axios.delete(`http://127.0.0.1:8000/api/order/${order.id}/items/manage/${item.id}/`,config)
        getItems();
        setitemDeleteShow(true)
    
    }
    async function putOrder() {
        let updatedOrder = order;
        updatedOrder.total_price = getTotalPrice();
        updatedOrder.total_work_time = getWorkTime(items);
        const response = await axios.put(`http://127.0.0.1:8000/api/order/${updatedOrder.id}/`,updatedOrder,config)
    }
    const closeDelete = () => {
        putOrder();
        setitemDeleteShow(false)
    }

    const getTotalPrice = () => {
        let result = 0;
        console.log(items);
        items.forEach(item => {
            result += getPrice(item);
        });
        return result
    }

    async function updateOrder() {
        const response = await axios.put(`http://127.0.0.1:8000/api/order/${formData2.id}/`,formData2,config)
        if (response.status === 200) {
            getOrders();
        }

    }
   
    const deleteOrder =() => {
        
    }
    
    const [formData, handleInputChange,handleSubmit,reset] = useCustomForm(item,putItem);
    const [formData2, handleInputChange2,handleSubmit2,reset2] = useCustomForm(order,updateOrder);
    
    useEffect(()=> {
        reset();
        reset2();
    },[item,order])


    return item && editorShow ? (
        <>
        <Modal title = "Deleted" modal = {itemDeleteShow} onClose = {closeDelete}> Item Succesfully Deleted
        <button onClick = {closeDelete}>Close</button></Modal>
        <div className="editor-container">

        <div className="editor-title">Item Editor</div>
        <form onSubmit = {handleSubmit}>
            <Input title = 'Cake Flavor:' name = 'cake_flavor' value = {formData.cake_flavor} onChange = {handleInputChange}/>
            <Input title = 'Frosting:' name = 'frosting' value = {formData.frosting} onChange = {handleInputChange}/>
            <Input title = 'Filling:' name = 'filling' value = {formData.filling} onChange = {handleInputChange}/>
            <Input textArea = {true} title = 'Design:' name = 'design_details' value = {formData.design_details} onChange = {handleInputChange}/>
            <div className="button-row">
            <button type = 'submit'>Save Changes</button>
            </div>
        </form> 
            <button className="warning" onClick ={deleteItem}>DELETE</button>
        </div>
        </> 
    ):  order.id && editorShow ?(
        <div className="editor-container">
        <div className="editor-title">Order Editor</div>
            <form onSubmit = {handleSubmit2}>
            <div className="email">Customer Email: {order.user.email}</div>
            <Input type = "date" title = 'Deliver Date:' name = 'deliver_date' value = {formData2.deliver_date} onChange = {handleInputChange2}/>
            <Input title = 'Total Work Time:' name = 'total_work_time' value = {formData2.total_work_time} onChange = {handleInputChange2}/>
            <Input title = 'Price Adjustment:' name = 'adjusted_price' value = {formData2.adjusted_price} onChange = {handleInputChange2}/>
            <Input textArea = {true} title = 'Notes:' name = 'notes' value = {formData2.notes} onChange = {handleInputChange2}/>
            <div className="button-row">
            <button type = 'submit'>Save Changes</button>
            </div>
        </form> 
            {/* <button className="warning" onClick ={deleteOrder}>DELETE</button> */}
        </div>
    ): <div className="select-message">Please Select an Order</div>;
}
 
export default Editor;