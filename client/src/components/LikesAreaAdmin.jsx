import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLikes } from './redux/asyncThunkFuncs';

function LikesAreaAdmin(props) {
  const dispatch = useDispatch();
  const current_client = props.current_clientP;

  const { likes } = useSelector(state => state.database);


  useEffect(() => {
    dispatch(getLikes())
  },[])

  return (
    <div className='OrdersAreaAdmin'>
        <div className='OrdersAreaAdmin-header'>
            <div>
                <img src={current_client.photo} />
            </div>
            <div>
                <h1>{current_client.name}</h1>
            </div>
        </div>
        <div className='OrdersAreaAdmin-orders'>
            <div>
              {
                likes.map((like, i) =>(
                  (like.userID === current_client._id)&&
                  <div key={i}>
                    <div>
                      <img src={like.img} />
                      <h3>{like.name}</h3>
                    </div>
                    <div className='order-info'>
                      <h4>price : {like.price}$</h4>
                      <h4>shipping: {like.shipping}$</h4>
                    </div>
                  </div>
                ))
              }
            </div>
        </div>
    </div>
  )
}

export default LikesAreaAdmin;