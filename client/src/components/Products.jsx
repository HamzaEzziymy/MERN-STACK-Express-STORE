import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaCartArrowDown, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addToOrders } from './redux/slice';
import { getLikes, getOrders, getProducts, getUser } from './redux/asyncThunkFuncs';
import axios from 'axios';

function Products() {
    const { products, loading_product, likes, loading_likes, user, loading_user } = useSelector(state=>state.database)
    const dispatch = useDispatch();
    const history = useNavigate();
    // const api = "http://192.168.137.1:8080";
    const api = "http://localhost:8080";
    const [a, setA] = useState("");


    // -------get the products and the orders from slice-----
    useEffect(() => {
        dispatch(getProducts());
        dispatch(getOrders());
        dispatch(getUser());
        dispatch(getLikes());
    }, [a]);
    

    // search about pLike in products
    const findLike = (id) => {
        if(!loading_likes && !loading_user){
            const l = likes.find(like => (like.pID === id && like.userID === localStorage.current_user_login));
            return l?true:false;
        }
    }
    
    
    // ------------------------add To Likes Func-------------
    const addToLikes = async (product) => {
        if(localStorage.current_user_login){
            await axios.post(`${api}/addToLikes`, {product, id:localStorage.current_user_login})
            .then(res => setA(res.data))
            .catch(error => console.log(error))
        }else{
            history("/login")
        }
    }
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

  return (
    <div className='products-comp'>
        <div className='products-content'>
            <div className='products'>
                {!loading_product?
                products.map((product,i)=>(
                    <div key={i}>
                        <img  src={product.imgs[0]} alt={product.name}/>
                        <div className='add-to-orders-btn' onClick={()=>handeladdToOrders(product)}><FaCartArrowDown className='add-to-orders-icon' /></div>
                        <h2>{product.name}</h2>
                        <div className='soldAndstars'>
                            <div className='heart-div'><FaHeart onClick={() => addToLikes(product)} style={findLike(product._id)&&{color:"red", transform:"scale(1.4)"}} className='heart-icon'/></div>|
                            <h4>Sold ({product.inventory})</h4>
                        </div>
                        <div className='price'>
                            <h3>{product.price} $</h3><s><h4>{product.price + product.price*0.7} $</h4></s>
                        </div>
                        {product.shipping === 0 ?<p className='shipping'>Free Shipping</p>:"+"+product.shipping+"$ Shipping"}
                        <div className='review-btn'>
                            <Link to={product._id}>See Review</Link>
                        </div>
                    </div>
                ))   
                :
                <div className='loading-img'>
                    <img src='https://usagif.com/wp-content/uploads/loading-96.gif' alt=''/>
                </div>
                }
            </div>
        </div>
    </div>
  )
}

export default Products;