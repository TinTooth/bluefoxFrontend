import { useEffect, useState } from "react";
import axios from "axios";
import "./OrderForm.css"
import ProductList from "../ProductList/ProductList";
import useCustomForm from "../../../hooks/useCustomForm";
import Input from "../../Util/Input/Input";
import Modal from "../../Util/Modal/Modal";
import useConfig from "../../../hooks/useConfig";
import ItemList from "../ItemsList/ItemList";
import useCalc from "../../../hooks/useCalc"
import OrderConfirmation from "../OrderConfirmation/OrderConfirmation";
import useAuth from "../../../hooks/useAuth";


const OrderForm = ({setItems, items}) => {
    const [products,setProducts] = useState([]);
    const [currentOrder,setcurrentOrder] = useState([]);
    const [options,setOptions] = useState([]);
    const [itemConfirmModal, setitemConfirmModal] = useState(false);
    const [orderConfirmModal, setorderConfirmModal] = useState(false);
    const config = useConfig();
    const [getPrice, getWorkTime] = useCalc();
    const [warningModal, setwarningModal] = useState(false);
    const [warningMessage, setwarningMessage] = useState("");
    let order = {
        customer_name:' ',
        customer_phone_number:' ',
        customer_email:' ',
        deliver_date: "",
        status: "Items Not Confirmed",
        total_work_time: 0,
        total_price: 0,
        notes:" "
    }
    
    useEffect(()=>{
        getProducts();
        getOptions();
    },[])

    async function getProducts() {
        const response = await axios.get("http://127.0.0.1:8000/api/products/")
        setProducts(response.data)
    }

    async function postItem(item) {
        const response = await axios.post(`http://127.0.0.1:8000/api/order/${currentOrder.id}/items/manage/`,item)
    }
    
    async function postOrder() {
        console.log(formData)
        const response = await axios.post("http://127.0.0.1:8000/api/order/",formData)
        console.log(response.data)
        setcurrentOrder(response.data)
    }

    async function putOrder() {
        let updatedOrder = currentOrder;
        updatedOrder.status = "Pending";
        updatedOrder.total_price = getTotalPrice();
        updatedOrder.total_work_time = getWorkTime(items);
        updatedOrder.adjusted_price = 0;
        const response = await axios.put(`http://127.0.0.1:8000/api/order/put/${updatedOrder.id}/`,updatedOrder)
        setcurrentOrder(response.data)
    }

    async function getOptions() {
        const response = await axios.get("http://127.0.0.1:8000/api/products/options/")
        setOptions(response.data)
    }

    const getTotalPrice = () => {
        let result = 0;
        items.forEach(item => {
            result += getPrice(item);
        });
        return result
    }
    const addItem = (item) => {
        let newitems = [...items,item];
        setItems(newitems);
    }

    const createOrder= () => {
       
        
        if (formData.deliver_date === order.deliver_date ){
            setwarningMessage("Please Choose A Deliver Date")
            setwarningModal(true);
        }
        else if (formData.notes === order.notes) {
            setwarningMessage("Please Enter Notes for Lisa")
            setwarningModal(true);
        }
        else if ( items.length < 1) {
            setwarningMessage("Please Add at Least 1 Item to the Order")
            setwarningModal(true);
        }
        else {
            postOrder();
            setitemConfirmModal(true);
        }
    }


    const prepItem = (item) => {
        let result = {
            order_id: currentOrder.id,
            product_id: item.product.id,
            quantity: item.quantity,
            design_details: item.design_details,
            frosting: item.frosting,
            filling: item.filling,
            cake_flavor: item.cake_flavor,
            price: getPrice(item)
        }
        return result
    }   

    const createItems = () => {
        putOrder();
        items.forEach(item => {
            let newItem = prepItem(item)
            postItem(newItem);
        })
        setitemConfirmModal(false);
        setorderConfirmModal(true);
    }

    const handleModal = () => {
        setitemConfirmModal(false);
        setorderConfirmModal(false);
       
    }

    const closeConfirmWindow = () => {
        setorderConfirmModal(false);
        window.location.reload(false);
    }

    const [formData, handleInputChange,handleSubmit] = useCustomForm(order,createOrder)

    return ( 
        <div className="form-container">
            <div className="products-row">
                <ProductList addItem={addItem} productName ={"Cakes"} products = {products}></ProductList>
                <ProductList addItem={addItem} productName ={"Cupcakes"} products = {products}></ProductList>
                <ProductList addItem={addItem} productName = {"Cookies"} products = {products}> </ProductList>
                <ProductList addItem={addItem} productName = {"Goodies"} products = {products}></ProductList>
            </div>
            <div className="column-row">
                <div className="column-form1">
                    <Input title = "Order Notes:" name ="notes" value = {formData.notes} onChange ={handleInputChange} textArea = {true} />
                <div className="notes">Write general notes about the order here or anything else you would like to tell her. Who is this for? What kind of Event? </div>
                </div>
                <div className="column-form1">
                        <div className="date">
                            <Input title ="Name:" name ="customer_name" value = {formData.customer_name} onChange = {handleInputChange}/>
                            <Input title ="Email:" name ="customer_email" value = {formData.customer_email} onChange = {handleInputChange}/>
                            <Input title ="Phone #:" name ="customer_phone_number" value = {formData.customer_phone_number} onChange = {handleInputChange}/>
                            <Input type = "date" title = "Deliver Date:" name= "deliver_date" value = {formData.deliver_date} onChange={handleInputChange}/>
                        </div>
                        <button onClick ={handleSubmit}>Submit Order Request</button> 
                    
                </div>
            </div>
            <Modal title = "" modal = {itemConfirmModal} onClose = {handleModal}>
                <div className="item-confirm">
                    <div className="message">Please Confirm Items Below</div>
                    <ItemList items = {items} setItems = {setItems}></ItemList>
                    <div className="button-row">
                        <button onClick = {handleModal}>CANCEL</button>
                        <button onClick = {createItems}>Confirm Order</button> 
                    </div>
                </div>
            </Modal>
            <Modal title = "Order Recieved!" modal = {orderConfirmModal} onClose ={closeConfirmWindow}> <OrderConfirmation items = {items} order = {currentOrder} close = {closeConfirmWindow}/></Modal>
            <Modal title = "Invalid Order" modal = {warningModal} onClose ={()=> setwarningModal(false)}>
                 
                 <div className="message">{warningMessage}</div> 
                 <div className="message-row">
                 <button onClick = {()=>setwarningModal(false)}>Close</button>
                 </div>
                 
                 </Modal>
        </div>
     );
}

export default OrderForm;