import "./Product.css"
import useCheckWidth from "../../../hooks/useCheckWidth";

const Product = ({product,image}) => {
    const screenSize = useCheckWidth()

    return screenSize.width >= 1000 ?(
        <div className="product-info">
            <div className="product-name lob2">{product.name}</div>
            <div className="image-container-card">
                <img src={image} alt="product image" />
            </div>
            <div className="details">
                <div className="description"> {product.description}</div>
            </div>
                <div className="price">${product.price}{product.type === "Cookies" || product.type === "Cupcakes" ? (
                            " per Dozen"
                ): " Each"}</div>
        </div>
      ): <div className="product-info">
      <div className="product-name lob2">{product.name}</div>
      <div className="image-container-card">
          <img src={image} alt="product image" />
      </div>
      <div className="details">
          <div className="description-mobile"> {product.description}</div>
      </div>
          <div className="price">${product.price}{product.type === "Cookies" || product.type === "Cupcakes" ? (
                      " per Dozen"
          ): " Each"}</div>
  </div> ;
}
 
export default Product;
