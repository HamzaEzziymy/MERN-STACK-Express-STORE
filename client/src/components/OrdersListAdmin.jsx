import React, { useEffect, useState } from 'react';
import OrdersAreaAdmin from './OrdersAreaAdmin';
import { getOrders, getUser } from './redux/asyncThunkFuncs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function OrdersListAdmin() {
  const history = useNavigate()
  const current_user_login = localStorage.current_user_login;
const {user, orders } = useSelector(state => state.database)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getOrders());
  },[])

  const num_orders = (id) => {
    return orders.filter(order => order.userID === id).length;
  }

  const [current_user_id, setCurrent_user_id] = useState(null);

  const handleOrdersBtn = (client) =>{
    setCurrent_user_id(client)
  }

  return (
    <>
      {current_user_login?
        <div className='orders-admin-all'>
            <h1>Orders</h1>
            <div className='orders-admin'>
                <div className='orders-area'>
                    {current_user_id?<OrdersAreaAdmin current_clientP={current_user_id}/>
                    :<h1 className='wellcom-admin'>Welcom Admin!</h1>}
                </div>
                <div className='orders-clients-area'>
                    {user.map((client, i) => (
                    <div  key={i}>
                        <div className='orders-client' onClick={()=>handleOrdersBtn(client)}>
                            <div>
                                <img src={client.photo} />
                            </div>
                            <div>
                                <h2>{client.name}</h2>
                            </div>
                            <div>
                                <h2 className='orders-num'>{num_orders(client._id)}</h2>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    ))
                    }
                </div>
            </div>
        </div>
      :history("/login")}
    </>
  )
}

export default OrdersListAdmin;