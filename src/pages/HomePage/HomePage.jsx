
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import useCheckWidth from "../../hooks/useCheckWidth.js";
import { MobileView, BrowserView } from "react-device-detect";
// Components
import LandingSection from "../../components/HomeComponents/LandingSection/LandingSection.jsx";
import ImageBar from "../../components/HomeComponents/ImageBar/ImageBar.jsx";
import ProductSection from "../../components/HomeComponents/ProductSection/ProductSection.jsx";
import Footer from "../../components/Footer/Footer.jsx"
import SideBar from "../../components/HomeComponents/SideBar/SideBar.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";

// IMAGES

import cake1 from "../../Images/cake1.jpeg";
import cake2 from "../../Images/cake2.jpeg";
import cake3 from "../../Images/cake3.jpeg";
import cupcake1 from "../../Images/cupcake1.jpeg";
import cupcake2 from "../../Images/cupcake2.jpeg";
import cupcake3 from "../../Images/cupcake3.jpeg";
import cookie1 from "../../Images/cookie1.jpeg";
import cookie2 from "../../Images/cookie2.jpeg";
import cookie3 from "../../Images/cookie3.jpeg";
import goodie1 from "../../Images/goodie1.jpeg";
import goodie2 from "../../Images/goodie2.jpeg";
import goodie3 from "../../Images/goodie3.jpeg";

const HomePage = () => {
  const screenSize = useCheckWidth()
  const [products,setProducts] = useState([]);
  // const [options,SetOptions] = useState([]);
  const [cakeProducts,setCakeProducts] = useState([]);
  const [cupcakeProducts,setCupCakeProducts] = useState([]);
  const [cookieProducts,setCookieProducts] = useState([]);
  const [goodieProducts,setGoodieProducts] = useState([]);
  const [cakeImages] = useState([cake1,cake2,cake3])
  const [cupcakeImages] = useState([cupcake1,cupcake2,cupcake3])
  const [cookieImages] = useState([cookie1,cookie2,cookie3])
  const [goodieImages] = useState([goodie1,goodie2,goodie3])
  //  REFS
  const cookieRef = useRef();
  const cakeRef = useRef();
  const cupcakeRef = useRef();
  const goodiesRef = useRef();


  useEffect(() => {
    getProducts()
  },[]);

  useEffect(() => {
    seperateProducts()
  },[products]);

  async function getProducts() {
    const response = await axios.get("http://127.0.0.1:8000/api/products/")
    setProducts(response.data)
  }
 
  const seperateProducts = () => {
      let cookies = products.filter(p => p.type === "Cookies");
      setCookieProducts(cookies);
      let cake = products.filter(p => p.type === "Cakes");
      setCakeProducts(cake);
      let cupcakes = products.filter(p => p.type === "Cupcakes");
      setCupCakeProducts(cupcakes);
      let goodies = products.filter(p => p.type ==="Goodies")
      setGoodieProducts(goodies);
  }


  return screenSize.width >= 1000 ?(
    <>
        <LandingSection cookieRef={cookieRef} cakeRef = {cakeRef} cupcakeRef = {cupcakeRef} goodiesRef = {goodiesRef}/>
        <ImageBar/>
        <ProductSection thisref = {cakeRef} productData = {cakeProducts} images = {cakeImages}/>
        <ProductSection thisref = {cupcakeRef} productData = {cupcakeProducts} images = {cupcakeImages} />
        <ProductSection thisref = {cookieRef} productData = {cookieProducts} images = {cookieImages} />
        <ProductSection thisref = {goodiesRef} productData = {goodieProducts} images = {goodieImages} />
        <Footer/>
    </>
    ) : 
    <>
    <NavBar/>
    <ImageBar/>
    <SideBar/>
    <ProductSection thisref = {cakeRef} productData = {cakeProducts} images = {cakeImages} mobile = {true}/>
    <ProductSection thisref = {cupcakeRef} productData = {cupcakeProducts} images = {cupcakeImages}  mobile = {true}/>
    <ProductSection thisref = {cookieRef} productData = {cookieProducts} images = {cookieImages} mobile = {true} />
    <ProductSection thisref = {goodiesRef} productData = {goodieProducts} images = {goodieImages}  mobile = {true}/>
    </>
};

export default HomePage;
