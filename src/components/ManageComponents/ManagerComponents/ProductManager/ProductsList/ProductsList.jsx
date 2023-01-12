import Product from "../Product/Product";
const ProductList = ({products,setproduct}) => {
    
    
    return (
        <>
        <div className="table-2">
            <div className="t-row head">
                    <div className="p-cell"> Product </div>
                    <div className="b-cell"> </div>
            </div>
            <div className="data nheight">
                {  products.map((p,i) => {
                    return (
                        <div className="t-row" key = {i} >
                           <Product product = {p} setproduct = {setproduct}/>
                        </div>
                    )
                } )
                }
            </div>
        </div>
        
        </>
      );
}
 
export default ProductList;