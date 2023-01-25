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
import useCheckWidth from "../../../hooks/useCheckWidth";
import OrderConfirmation from "../OrderConfirmation/OrderConfirmation";



const OrderForm = ({setItems, items}) => {
    const screenSize = useCheckWidth();
    const [products,setProducts] = useState([]);
    const [currentOrder,setcurrentOrder] = useState([]);
    const [options,setOptions] = useState([]);
    const [itemConfirmModal, setitemConfirmModal] = useState(false);
    const [orderConfirmModal, setorderConfirmModal] = useState(false);
    const config = useConfig();
    const [getPrice, getWorkTime] = useCalc();
    const [warningModal, setwarningModal] = useState(false);
    const [warningMessage, setwarningMessage] = useState("");
    const [itemListModal, setitemListModal] = useState(false);
    const [infoModal, setinfoModal] = useState(false);
    let order = {
        customer_name:' ',
        customer_phone_number:'xxx - xxx - xxxxx ',
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
       
       let message = '' ;
        if (formData.deliver_date === order.deliver_date ){
            message += 'Enter an Order Date'
        }
        else if (formData.notes === order.notes) {
            message += 'Enter a Note for Lisa'
        }
        else if (formData.customer_email === order.customer_email) {
            message += 'Enter your Email'
        }
        else if (formData.customer_phone_number === order.customer_phone_number) {
            message += 'Enter your Phone Number'
        }
        else if (formData.customer_name === order.customer_name) {
            message += 'Enter your Name'
        }
        else if ( items.length < 1) {
            message += 'Add at least 1 itemn to your Order'
            
        }
        
        if (message == ""){
            postOrder();
            if( infoModal === true){setinfoModal(false)};
            setitemConfirmModal(true);
        }
        else {
            setwarningMessage(message)
            setwarningModal(true);
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

    const handleItemList = () => {
        itemListModal ? (setitemListModal(false)):setitemListModal(true);
    }
    const handleInfoModal = () => {
        infoModal ? (setinfoModal(false)):setinfoModal(true);
    }

    const closeConfirmWindow = () => {
        setorderConfirmModal(false);
        window.location.reload(false);
    }

    const [formData, handleInputChange,handleSubmit] = useCustomForm(order,createOrder)

    return screenSize.width >= 1100 ? ( 
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
                <div className="column-form2">
                    <div className="input2">
                        <Input title ="Name:" name ="customer_name" value = {formData.customer_name} onChange = {handleInputChange}/>
                    </div>
                    <div className="input2">
                        <Input title ="Email:" name ="customer_email" value = {formData.customer_email} onChange = {handleInputChange}/>
                    </div>
                    <div className="input2">
                        <Input title ="Phone #:" name ="customer_phone_number" value = {formData.customer_phone_number} onChange = {handleInputChange}/>
                    </div>
                    <div className="date input2">
                        <Input type = "date" title = "OrderDate:" name= "deliver_date" value = {formData.deliver_date} onChange={handleInputChange}/>
                    </div>
                    <button onClick ={handleSubmit}>Submit Order Request</button>   
                </div>
            </div>
            <Modal title = "" modal = {itemConfirmModal} onClose = {handleModal}>
                <div className="item-confirm">
                    <div className="message">Please Confirm Items Below</div>
                    <ItemList items = {items} setItems = {setItems}></ItemList>
                    <div className="button-row ">
                        <button className = "modal-button" onClick = {handleModal}>CANCEL</button>
                        <button className = "modal-button" onClick = {createItems}>Confirm Order</button> 
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
     ) : 
     <>
        <Modal title = "" modal = {itemConfirmModal} onClose = {handleModal} mobile ={true}>
                <div className="item-confirm">
                    <div className="message">Please Confirm Items Below</div>
                    <ItemList items = {items} setItems = {setItems}></ItemList>
                    <div className="button-row ">
                        <button className = "modal-button" onClick = {handleModal}>CANCEL</button>
                        <button className = "modal-button" onClick = {createItems}>Confirm Order</button> 
                    </div>
                </div>
            </Modal>
        <Modal title = 'Order Items' modal = {itemListModal} mobile = {true} onClose = {handleItemList}>
            <ItemList items = {items} setItems = {setItems}></ItemList>
        </Modal>
        <Modal title = "" modal = {infoModal} onClose = {handleInfoModal} mobile = {true}>
        <div className="input2">

                        <Input title ="Name:" name ="customer_name" value = {formData.customer_name} onChange = {handleInputChange}/>
                    </div>
                    <div className="input2">
                        <Input title ="Email:" name ="customer_email" value = {formData.customer_email} onChange = {handleInputChange}/>
                    </div>
                    <div className="input2">
                        <Input title ="Phone #:" name ="customer_phone_number" value = {formData.customer_phone_number} onChange = {handleInputChange}/>
                    </div>
                    <div className="date input2">
                        <Input type = "date" title = "OrderDate:" name= "deliver_date" value = {formData.deliver_date} onChange={handleInputChange}/>
                    </div>
                    <div className="column-form1">
                    <Input title = "Order Notes:" name ="notes" value = {formData.notes} onChange ={handleInputChange} textArea = {true} />
                    </div>
                <div className="notes">Write general notes about the order here or anything else you would like to tell her. Who is this for? What kind of Event? 
                </div>
                    <button onClick ={handleInfoModal}>Cancel</button>   
                    <button onClick ={handleSubmit}>Submit Order Request</button>          
        </Modal>
        <Modal title = "Invalid Order" modal = {warningModal} onClose ={()=> setwarningModal(false)}>
                 
                 <div className="message">{warningMessage}</div> 
                 <div className="message-row">
                 </div>
            </Modal>
            <Modal title = "Order Recieved!" modal = {orderConfirmModal} onClose ={closeConfirmWindow} mobile = {true}> <OrderConfirmation items = {items} order = {currentOrder} close = {closeConfirmWindow}/></Modal>
        
        <div className="orderpage-container">
             <div className="order-sidebar">
                <button className="sidebar-button" onClick = {handleItemList}> Cart</button>
                <button className="sidebar-button" onClick = {handleInfoModal}> Confirm</button>
            </div>
            <div className="product-container-mobile">
                <ProductList addItem={addItem} productName ={"Cakes"} products = {products}></ProductList>
                <ProductList addItem={addItem} productName ={"Cupcakes"} products = {products}></ProductList>
                <ProductList addItem={addItem} productName = {"Cookies"} products = {products}> </ProductList>
                <ProductList addItem={addItem} productName = {"Goodies"} products = {products}></ProductList>
            </div>
        </div>

     </>
     
     ;
}

export default OrderForm;