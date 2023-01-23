import { useEffect, useState } from "react";
import axios from "axios";
import "./Menu.css"
import OptionsList from "../OptionsList/OptionsList";

const Menu = ({type, close, mobile = false}) => {
    const [options,setOptions] = useState([]);

    useEffect(()=>{
        getOptions();
    },[]);

    async function getOptions() {
        const response = await axios.get("http://127.0.0.1:8000/api/products/options/")
        setOptions(response.data)
      }

    return type ==="Cakes" && options.length  && mobile == false?( 
        <div className="menu">
            <div className="item-row">
                <div className="column">
                    <OptionsList type = {"Cake Flavors"} options = {options}/>
                    <OptionsList type = {"Classic Frostings"} options = {options}/>
                    <OptionsList type = {"Specialty Fillings"} options = {options}/>
                </div>
                <div className="column">
                    <OptionsList type = {"Specialty Frostings"} options = {options}/>
                    <OptionsList type = {"Cake Size"} options = {options}/>
                </div>
            </div>
            <div className="button-row">
            <button onClick={close}>Close</button>
            </div>
        </div>
    ): type === 'Cupcakes' && options.length && mobile == false? (
    <div>
        <div className="flavors">
                <OptionsList type = {"Cake Flavors"} options = {options}/>
                <OptionsList type = {"Classic Frostings"} options = {options}/>
                <OptionsList type = {"Specialty Cupcake Flavors"} options = {options}/>
        </div>
        <div className="button-row">
            <button onClick={close}>Close</button>
            </div>
    </div>
    ): type ==="Cakes" && options.length ? (
        <div className="menu-mobile">
            <div className="item-row">
                <div className="column-mobile">
                    <OptionsList type = {"Cake Flavors"} options = {options}/>
                    <OptionsList type = {"Classic Frostings"} options = {options}/>
                    <OptionsList type = {"Specialty Fillings"} options = {options}/>
                    <OptionsList type = {"Specialty Frostings"} options = {options}/>
                </div>
            </div>
            <div className="button-row">
            <button onClick={close}>Close</button>
            </div>
        </div>


    ) :  type === 'Cupcakes' && options.length ? (
        <div>
        <div className="flavors">
                <OptionsList type = {"Cake Flavors"} options = {options}/>
                <OptionsList type = {"Classic Frostings"} options = {options}/>
                <OptionsList type = {"Specialty Cupcake Flavors"} options = {options}/>
        </div>
        <div className="button-row">
            <button onClick={close}>Close</button>
            </div>
    </div>
    ): null
} 
 
export default Menu;