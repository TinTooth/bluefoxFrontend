const Product = ({product,setproduct}) => {
   
    const handleClick = () => {
        setproduct(product);
    }
   
    return product ? (
        <>
        <div className="p-cell">{product.name}</div>
        <div className="dp-cell">{product.type === 'cake' ? (product.description):null}</div>
        <div className="bp-cell">
            <button onClick = {handleClick}>Edit</button>
        </div>
        </> 
    ): null;
}
 
export default Product;