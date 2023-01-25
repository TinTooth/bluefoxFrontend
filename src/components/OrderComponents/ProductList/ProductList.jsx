import ProductModal from "../ProductModal/ProductModal";
import "./ProductList.css"
import useCheckWidth from "../../../hooks/useCheckWidth";


const ProductList = ({addItem, productName,products}) => {
    const screenSize = useCheckWidth()
    
    return products.length &&  screenSize.width >= 1000? ( 
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
     ):
     <>
     <div className="product-list-container-mobile">
         <div className="product-heading lob2">{productName}</div>
         {products.map((p,i) =>{
             return p.type === productName? (
                 <div className="product-row-mobile" key ={i}>
                     {p.name}
                     <ProductModal addItem={addItem} product = {p} products = {products}></ProductModal>
                 </div>
                 ):null
             })}
     </div>
     </>;
}
 
export default ProductList;