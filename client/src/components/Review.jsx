import React, { useEffect, useState } from 'react'
import { FaCartArrowDown, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ProductSlide from './ProductSlide';
import { getLikes, getOrders, getProducts } from './redux/asyncThunkFuncs';
import axios from 'axios';

function Review() {
  // cmi
  // const api = "http://192.168.137.1:8080";
  const api = "http://localhost:8080";
  const dispatch = useDispatch();
  const [n_img, setN_img] = useState(0);
  const [a, setA] = useState()
  const history = useNavigate();  
  const { code } = useParams();
  const { products } = useSelector(state => state.database)

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getOrders());
    dispatch(getLikes());
  }, [a]);

  // -----------------------find product from products-------
  const product = products.find(p=>p._id===code);

  // -----------------------change image review function-----
  const handelNimg = (i)=>{
    setN_img(i)
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

//---------------------------------------------runder------------------------------------------------
  return (
    <div className='review'>
      {product?
      <div className='review-product'>
        <div className='review-img'>
          <img src={product.imgs[n_img]} alt={product.name}/>
          <div className='add-to-orders-btn'>
            <FaCartArrowDown onClick={() => handeladdToOrders(product)} className='add-to-orders-icon'/>
          </div>
        </div>

        <div className='review-desc'>
          <div className='price'>
            <h1>{product.price}</h1><h4>$</h4>
            <p><s>{product.price + product.price*0.7}$</s></p>
            <h4>-70%</h4>
          </div>
          <div className='description'>{product.description}</div>
          <div className='review'>
            <div className='heart-div'><FaHeart className='heart-icon'/></div><div className='vertical-line'></div>
            <div className='sold'>Sold ({product.inventory})</div>
          </div>
          <hr />
          <div className='images'>
            {product.imgs.map((img,i)=>(
              <img key={i} src={img} alt={product.name} onClick={()=>handelNimg(i)}/>
            ))}
          </div>
        </div>
      </div>
      :
      <div className='loading-img'>
        <img src='https://usagif.com/wp-content/uploads/loading-96.gif' alt=''/>
      </div>
      }
      <hr style={{margin:"0 70px 80px 70px"}}/>
      <ProductSlide/>
    </div>
  )
}

export default Review;