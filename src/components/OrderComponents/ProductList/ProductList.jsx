import ProductModal from "../ProductModal/ProductModal";
import "./ProductList.css"


const ProductList = ({addItem, productName,products}) => {
    
    
    return products.length ? ( 
        <>
        
        <div className="product-list-container">
            <div className="product-heading lob2">{productName}</div>
            {products.map((p,i) =>{
                return p.type === productName? (
                    <div className="product-row" key ={i}>
                        {p.name}
                        <ProductModal addItem={addItem} product = {p} products = {products}></ProductModal>
                    </div>
                    ):null
                })}
        </div>
        </>
     ):null;
}
 
export default ProductList;