import './ProductEditor.css'
import useConfig from '../../../../../hooks/useConfig';
import useCustomForm from '../../../../../hooks/useCustomForm';
import { useEffect,useState } from "react";
import Input from '../../../../Util/Input/Input';
import axios from 'axios';
const ProductEditor = ({product,getProducts}) => {
    const config = useConfig();
    useEffect(()=> {
        reset();
    },[product])

    const saveChanges = () => {
        putProduct();
    }

    async function putProduct () {
        let response = await axios.put(`http://127.0.0.1:8000/api/products/manage/${product.id}/`,formData,config)
        if (response.status === 200){
            getProducts()
        }
    }
    
    
    const [formData, handleInputChange,handleSubmit,reset] = useCustomForm(product, saveChanges);

    return (  
        <div className="product-editor">
            <div className='editor-title'>Product Editor</div>
            <form onSubmit={handleSubmit}>
                <Input title='Name' name = 'name' value = {formData.name} onChange = {handleInputChange}/>
                <Input title='Price' name = 'price' value = {formData.price} onChange = {handleInputChange}/>
                <Input title='Work Time' name = 'work_time' value = {formData.work_time} onChange = {handleInputChange}/>
                {/* <Input  type = 'checkbox' title='Price by Dozen' name = 'pricebydozen' value = {formData.pricebydozen} onChange = {handleInputChange}/> */}
                <Input textArea = {true} title='Description' name = 'description' value = {formData.description} onChange = {handleInputChange}/>
                <div className="button-row">
                    <button type = 'submit'>Save Changes</button>
                </div>
            </form>
        </div>

    );
}
 
export default ProductEditor;