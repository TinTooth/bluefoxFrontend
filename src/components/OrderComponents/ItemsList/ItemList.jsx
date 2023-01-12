import { useEffect,useState } from "react";
import Item from "../Item/Item";
import "./itemList.css"
import useCalc from "../../../hooks/useCalc";
import Table from "react-bootstrap/esm/Table";

const ItemList = ({items, setItems, noRemove = false, noDetails = false, setcurrentItem}) => {
    const [total, setTotal] = useState(0);
    const [getPrice] = useCalc();

    useEffect (()=>{
        getTotal();
    },[items])

    const getTotal = () => {
        if (items.length > 0) {
            let result = 0;
            items.forEach(item => {
                result += getPrice(item);
            })
            setTotal(result);
        }
    }

    

    return items.length ? (
        <>
        <div className="item-list">
            <div className='heading lob2'>Order Items</div>
            <div className="t-row2 column-names">
                <div className="n"> # </div>
                <div className="i"> Item</div>
                <div className="p"> Price</div>
                <div className="b2"> </div>
            </div>
            
            <div className="data2">
                {items.map((item ,i) =>{
                    return (
                        <div className="t-row2" key = {i}>
                            <Item item = {item} i ={i} setItems = {setItems} setcurrentItem = {setcurrentItem}
                             items = {items} noRemove = {noRemove} noDetails = {noDetails}/>                       
                        </div>
                        )
                    })}
                </div>
            <div className="total">Total ${total}</div>
        </div>
        {/* <div onClick = {click}>TEST</div> */}
        </>
        
    ):<div className="item-list">
          
        <div className='heading lob2'>Order Items</div>
        {/* <div className="note"> No Items Yet</div> */}
            
    

    </div>;
}
 
export default ItemList;

