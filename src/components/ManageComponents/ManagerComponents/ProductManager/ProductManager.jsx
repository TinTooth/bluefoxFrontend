import axios from "axios";
import { useState,useEffect } from "react";
import ProductList from "./ProductsList/ProductsList";
import "./ProductManager.css"
import ProductEditor from "./ProductEditor/ProductEditor";


const ProductManager = ({show}) => {
    const [product, setproduct] = useState();
    const [products, setproducts] = useState();

    useEffect (() => {
        getProducts()
    },[])

    async function getProducts() {
        const response = await axios.get("http://127.0.0.1:8000/api/products/")
        setproducts(response.data)
    }
    
    return show ?( 
        <div className="manager">
            <div className="product-manager-list-container">
                <ProductList products = {products} setproduct={setproduct} />
            </div>
            <ProductEditor product = {product} getProducts = {getProducts} />
        </div>
     ) :null;
}
 
export default ProductManager;