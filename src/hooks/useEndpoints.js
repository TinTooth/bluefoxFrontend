// import useConfig from "./useConfig"
// import axios from "axios";
// const useEndpoints = () => {
//     const config = useConfig();


//     async function getProducts() {
//         const response = await axios.get("http://127.0.0.1:8000/api/products/")
//         setProducts(response.data)
//     }

//     async function postItem(item,order) {
//         const response = await axios.post(`http://127.0.0.1:8000/api/order/${order.id}/items/manage/`,item,config)
//         setcurrentOrder(response.data)
//     }
    
//     async function postOrder(order) {
//         const response = await axios.post("http://127.0.0.1:8000/api/order/",order,config)
//         setcurrentOrder(response.data)
//     }

//     async function putOrder(currentOrder,setcurrentOrder) {
//         let updatedOrder = currentOrder;
//         updatedOrder.status = "Pending";
//         updatedOrder.total_price = getTotalPrice();
//         updatedOrder.total_work_time = getWorkTime(items);
//         console.log(updatedOrder);
//         const response = await axios.put(`http://127.0.0.1:8000/api/order/${updatedOrder.id}/`,updatedOrder,config)
//         setcurrentOrder(response.data)
//     }

//     async function getOptions() {
//         const response = await axios.get("http://127.0.0.1:8000/api/products/options/")
//         setOptions(response.data)
//     }
    
    
    
    
    
//     return [getProducts,postItem,postOrder,putOrder,getOptions];
// }
 
// export default useEndpoints;