import React, { useEffect } from 'react'
import { FaCartPlus } from 'react-icons/fa';
import { IoHeartDislike } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { getLikes } from './redux/asyncThunkFuncs';

function MyLists() {
  const dispatch = useDispatch();
  const { likes, loading_likes } = useSelector(state => state.database);

  // -------------------dispatching likes--------
  useEffect(() => {
    dispatch(getLikes());
  }, [dispatch]);
  
  
  return (
    <div className='mylists'>
      <div className='lists-head'>
      <marquee behavior="slide" style={{textAlign:"center"}}><h1>{likes.length>0?"These are the products that you liked":"No products liked"}</h1></marquee>
      </div>
      {!loading_likes?
      <>
      {likes.length>0?
      <>
        {
          likes.map((product,i)=>(
            <div key={i}>
              <div className='img'>
                <img src={product.img} alt={product.name}/>
                <h5>{product.name}</h5>
              </div>
              <div className='price'>
                <div><h2>{product.price} $</h2></div>
                {product.shipping>0
                  ?<p className='Shipping'>+ Shipping: {product.shipping}$</p>
                  :<p style={{color:"green"}}>Free Shipping</p>
                }
                <div className='sold'>Sold({product.inventory})</div>
              </div>
              <div className='btns'>
                <div>Add <FaCartPlus /></div>
                <div>Delete <IoHeartDislike /></div>
              </div>
            </div>
          ))
        }
      </>
      :<h1 style={{textAlign:"center", color:"red"}}>No products liked</h1>}
      </>
      :<div className='loading-img'>
        <img src='https://usagif.com/wp-content/uploads/loading-96.gif'/>
      </div>
    }
    </div>
  )
}

export default MyLists;