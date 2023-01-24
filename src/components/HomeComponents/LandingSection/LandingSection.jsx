import "./LandingSection.css"

import React from "react"
import { useNavigate } from "react-router-dom";
import fox from "../../../Images/Fox2.jpg"

const LandingSection = ({cookieRef, cakeRef, cupcakeRef, goodiesRef, mobile = false}) => {
    const navigate = useNavigate()
    


    const handleSectionClick = e => {
        switch(e.target.name) {
            case "cakes" : cakeRef.current?.scrollIntoView({behavior: "smooth"});break;
            case "cupcakes" : cupcakeRef.current?.scrollIntoView({behavior: "smooth"});break;
            case "cookies" : cookieRef.current?.scrollIntoView({behavior: "smooth"});break;
            case "goodies" : goodiesRef.current?.scrollIntoView({behavior: "smooth"});break;
        }
    }

    const handleOrderClick = () => {
        navigate('/order');
    }

    return mobile === false ? (
        <div className="section-container">
            <div className="nav-bar">
                <button onClick = {handleSectionClick} name = 'cakes'>Cakes</button>
                <button onClick = {handleSectionClick} name = 'cupcakes'>Cupcakes</button>
                <button onClick = {handleSectionClick} name = 'cookies'>Cookies</button>
                <button onClick = {handleSectionClick} name = 'goodies'>Other Goodies</button>
                <button onClick={()=> window.location.href = 'https://www.instagram.com/blue_fox_bakery/?hl=en'}>Instagram</button>
                <button onClick={handleOrderClick}>Order</button>
            </div>
            <div className="title-container">
                <div className="heading1 font1 lob2">Blue Fox</div>
                <div className="heading2 font1 lob2">Bakery</div>
                <div className="subhead">
                    A Home Bakery in Fox Point Wisconsin
                </div>
                <div className="subhead"> Started by Lisa in 2017, she has been sweetening up events since!</div>
            </div>
            <div className="footer font1 lob2"> See Lisa's Creations Below</div>
        </div>
      ):
      <><div className="landing-container">

        <div className="landing">
            <div className="landing-img">
                <img src={fox} alt="Fox Logo" className="logo" />
            </div>
            <div> A Home Bakery in Fox Point Wisconsin</div>
            <div> Started by Lisa in 2017, she has been sweetening up events since!</div>
            <div className="footer font1 lob2"> See Lisa's Creations Below</div>
        </div>
      </div>
      </>
      ;
}
 
export default LandingSection;