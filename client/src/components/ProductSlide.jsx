import React, { useEffect, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { addToOrders } from "./redux/slice";
import { getLikes, getOrders, getProducts, getUser } from "./redux/asyncThunkFuncs";
import axios from "axios";

function ProductSlide(){
  const history = useNavigate();
  const dispatch = useDispatch();
  const [a, setA] = useState("");
  // const api = "http://192.168.137.1:8080";
  const api = "http://localhost:8080";

  // ---------------------get the products from slice-------
  const { products } = useSelector(state => state.database)

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getOrders());
    dispatch(getUser());
    dispatch(getLikes());
  }, [a]);


  // ------------------------add To Orders Func-------------
  const handeladdToOrders = async (product)=>{
    if(localStorage.current_user_login){
        await axios.post(`${api}/addToOrders`, {product, id:localStorage.current_user_login})
        .then(res => setA(res.data))
        .catch(error => console.log(error))
    }else{
        history("/login")
    }
  }
  
  const getRandomPoducts = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };
  

  if(products.length>0){
    var randomPoducts = [
      getRandomPoducts(products),
      getRandomPoducts(products),
      getRandomPoducts(products),
      getRandomPoducts(products),
      getRandomPoducts(products),
      getRandomPoducts(products)
    ];
  }
  

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

  return (
    <div className="slide">
      <h1>Suggestions</h1>
      {randomPoducts?
      <Slider {...settings}>
        {
          randomPoducts.map((p,i)=>(
          <div key={i} className="products-slide-div">
            <img className="image-slide" src={p.imgs[0]} alt=""/>
            <div className="slide-btn">
              <Link to={"../"+p._id} >review</Link>
              <FaCartArrowDown className='add-to-orders-icon' onClick={()=>handeladdToOrders(p)}/>
            </div>
          </div>
          ))
        }
      </Slider>
      :<div className='loading-img'>
        <img src='https://usagif.com/wp-content/uploads/loading-96.gif' alt=''/>
      </div>
      }
    </div>
  );
};

export default ProductSlide;