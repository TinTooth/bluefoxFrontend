import "./ImageBar.css"
import image5 from "../../../Images/weddingcookie.jpeg"
import image2 from "../../../Images/penguincake.jpeg"
import image3 from "../../../Images/rosecupcake.jpeg"
import image4 from "../../../Images/monkeycake.jpeg"
import image1 from "../../../Images/butterflycookies.jpeg"


const ImageBar = () => {
    return ( 
        <>
        {/* <div className="divider"></div> */}
        <div className="image-bar">
            <div className="image-container">
                <img src = {image1} alt="image1" />
            </div>
            <div className="image-container">
                <img src = {image2} alt="image1" />
            </div>
            <div className="image-container">
                <img src = {image3} alt="image1" />
            </div>
            <div className="image-container">
                <img src = {image4} alt="image1" />
            </div>
            <div className="image-container">
                <img src = {image5} alt="image1" />
            </div>
        </div>
        </>
     );
}
 
export default ImageBar;