import axios from "axios";
import { useState,useEffect } from "react";
import useCustomForm from "../../../hooks/useCustomForm";
import Input from "../../Util/Input/Input";
import "./ProductForm.css"

const ProductForm = ({product,addItem,closeModal,products}) => {
    const [options,setOptions] = useState([]);
    const [filteredOptions, setfilteredOptions] = useState({});
    const quantity = [{description:12},{description:24},{description:36},{description:48},{description:60}]
    const [warning, setwarning] = useState('small-warning');
    let designDefault = ''
  
    const item = {
        product:product,
        order_id: 0,
        quantity: 1,
        design_details: designDefault,
        cake_flavor: "NA",
        frosting: "NA",
        filling: "NA",
        size: "NA"
        
    }
    
    const checkForm = (formData) => {
        if (
            formData.quantity == 1 && formData.product.pricebydozen === true
            || formData.design_details === designDefault
            || formData.size === "NA" && formData.product.type === "Cakes"
        )
        { return false}
        else {return true}
    }


    const createItem = (formData) => {
        if(checkForm(formData)) {
            if (product.type === "Cakes"){
                let newproduct = products.filter(p => p.description === formData.size && p.name.includes(product.name));
                console.log(newproduct[0]);
                formData.product = newproduct[0];
            }
            addItem(formData)
            closeModal();
        }
        else {
            setwarning('large-warning')
        }
    }
    
    
    
    
    const [formData, handleInputChange,handleSubmit] = useCustomForm(item,createItem);

    useEffect(()=>{
        getOptions();
    },[]);

    useEffect(()=>{
        setArrays();
    },[options]);

    async function getOptions() {
        const response = await axios.get("http://127.0.0.1:8000/api/products/options/")
        setOptions(response.data)
    }

    const setArrays = () => {
        let cakeflavors = options.filter(o => o.type === "Cake Flavors");
        let classicFrostings = options.filter(o => o.type === "Classic Frostings");
        let specialtyFrostings = options.filter(o => o.type === "Specialty Frostings");
        let allFrostings = [...classicFrostings,...specialtyFrostings];
        let cakesize= options.filter(o => o.type === "Cake Size");
        let classicFillings= options.filter(o => o.type === "Classic Fillings");
        let specFillings= options.filter(o => o.type === "Specialty Fillings");
        let allFillings = [...classicFillings,...specFillings];
        let cupcakeFlavors= options.filter(o => o.type === "Specialty Cupcake Flavors");
        setfilteredOptions({cakeflavors,classicFrostings,allFrostings, classicFillings, allFillings,cakesize,cupcakeFlavors})
    }

    const cakefrostings = () => {
        return product.name.includes("Classic") ? (filteredOptions.classicFrostings) : filteredOptions.allFrostings;
    } 
    const cakefillings = () => {
        return product.name.includes("Classic") ? (filteredOptions.classicFillings) : filteredOptions.allFillings;
    } 
    

    
    return options.length && product.type === "Cakes" ? (
        <div className="product-form-container">
            <div className="pric" >${product.price} Each, Depending on Size </div>
            <div className="descrip">{product.description}</div>
            <form className = 'form' onSubmit={handleSubmit}>
            <div className="input-row">
                <Input title = "Cake Flavor: " name ="cake_flavor" value = {formData.cake_flavor}
                 onChange = {handleInputChange} options = {filteredOptions.cakeflavors} select = {true}/>
            </div>
            <div className="input-row">
                <Input title = "Cake Frosting: " name ="frosting" value = {formData.frosting}
                 onChange = {handleInputChange} options = {cakefrostings()} select = {true}/>
            </div>
            <div className="input-row">
                <Input title = "Cake Filling: " name ="filling" value = {formData.filling}
                 onChange = {handleInputChange} options = {cakefillings()} select = {true}/>
            </div>
            <div className="input-row">
                <Input title = "Cake Size: " name ="size" value = {formData.size}
                 onChange = {handleInputChange} options = {filteredOptions.cakesize} select = {true}/>
            </div>
            <div className="input-row">
                <Input title = "Details: " name ="design_details" value = {formData.design_details}
                 onChange = {handleInputChange} textArea = {true}/>
            </div>
            <div className="instructions">Add Theme and Design Details (Colors, Theme...) As Well as Any Special Instructions for Lisa</div>
                    <div className="final-row">
                        <div className={warning}> Please Be Sure To Fill Out Entire Form</div>
                        <button type="submit">ADD to Order</button>
                    </div>
            </form>
        </div> 
     ) : options.length && product.type === "Cupcakes"  && product.name != "Specialty Cupcakes"?(
        <div className="product-form-container">
            <div className="pric">${product.price} Per Dozen </div>
            <div className="descrip">{product.description}</div>
            <form className = 'form' onSubmit={handleSubmit}>
                <div className="input-row">
                    <Input title = "Cake Flavor: " name ="cake_flavor" value = {formData.cake_flavor}
                        onChange = {handleInputChange} options = {filteredOptions.cakeflavors} select = {true}/>
                </div>
                <div className="input-row">
                <Input title = "Frosting: " name ="frosting" value = {formData.frosting}
                    onChange = {handleInputChange} options = {filteredOptions.classicFrostings} select = {true}/>
                    </div>
                <div className="input-row">
                <Input title = "Quantity: " name ="quantity" value = {formData.quantity}
                    onChange = {handleInputChange} options = {quantity} select = {true}/>
                </div>
                <div className="input-row">
                    <Input title = "Details: " name ="design_details" value = {formData.design_details}
                        onChange = {handleInputChange} textArea = {true}/>
                </div>
                    <div className="instructions">Add Theme and Design Details (Colors, Theme...) As Well as Any Special Instructions for Lisa</div>
                    <div className="final-row">
                        <div className={warning}> Please Be Sure To Fill Out Entire Form</div>
                        <button type="submit">ADD to Order</button>
                    </div>
                </form>
        </div> 
     ):options.length && product.type === "Cupcakes" ? (
        <div className="product-form-container">
            <div className="pric">${product.price} Per Dozen </div>
            <div className="descrip">{product.description}</div>
            <form className = 'form' onSubmit={handleSubmit}>
            <div className="input-row">
                <Input title = "Specialty CupCake: " name ="cake_flavor" value = {formData.cake_flavor}
                    onChange = {handleInputChange} options = {filteredOptions.cupcakeFlavors} select = {true}/>
            </div>
            <div className="input-row">
                <Input title = "Quantity: " name ="quantity" value = {formData.quantity}
                    onChange = {handleInputChange} options = {quantity} select = {true}/>
            </div>
            <div className="input-row">
                <Input title = "Details: " name ="design_details" value = {formData.design_details}
                onChange = {handleInputChange} textArea = {true}/>
            </div>
                
            <div className="instructions">Add Theme and Design Details (Colors, Theme...) As Well as Any Special Instructions for Lisa</div>
                    <div className="final-row">
                        <div className={warning}> Please Be Sure To Fill Out Entire Form</div>
                        <button type="submit">ADD to Order</button>
                    </div>
            </form>
        </div> 
    ): options.length  && product.pricebydozen ? (
        <div className="product-form-container">
            <div className="pric">${product.price} Per Dozen </div>
            <div className="descrip">{product.description}</div>
            <form className = 'form' onSubmit={handleSubmit}>
            <div className="input-row">
                <Input title = "Quantity: " name ="quantity" value = {formData.quantity}
                    onChange = {handleInputChange} options = {quantity} select = {true}/>
            </div>
            <div className="input-row">
                <Input title = "Details: " name ="design_details" value = {formData.design_details}
                onChange = {handleInputChange} textArea = {true}/>
            </div>
             
                <div className="instructions">Add Theme and Design Details (Colors, Theme...) As Well as Any Special Instructions for Lisa</div>
                    <div className="final-row">
                        <div className={warning}> Please Be Sure To Fill Out Entire Form</div>
                        <button type="submit">ADD to Order</button>
                    </div>
            </form>
        </div> 
    ): options.length ? (
        <div className="product-form-container">
           <div className="pric" >${product.price} Each </div>
            <div className="descrip">{product.description}</div>
            <form className = 'form' onSubmit={handleSubmit}>
            <div className="input-row">
                <Input title = "Quantity: " name ="quantity" value = {formData.quantity}
                    onChange = {handleInputChange} />
            </div>
            <div className="input-row">
                <Input title = "Details: " name ="design_details"value = {formData.design_details}
                onChange = {handleInputChange} textArea = {true}/>
            </div>
              
                <div className="instructions">Add Theme and Design Details (Colors, Theme...) As Well as Any Special Instructions for Lisa</div>
                    <div className="final-row">
                        <div className={warning}> Please Be Sure To Fill Out Entire Form</div>
                        <button type="submit">ADD to Order</button>
                    </div>
            </form>
        </div> ):null;
}
 
export default ProductForm;