import React, { useEffect } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from './redux/asyncThunkFuncs';

function OrdersAreaAdmin(props) {
const current_client = props.current_clientP;
  const dispatch = useDispatch();

  const { orders } = useSelector(state => state.database);


  useEffect(() => {
    dispatch(getOrders())
  },[])

  return (
    <div className='OrdersAreaAdmin'>
        <div className='OrdersAreaAdmin-header'>
            <div>
                <img src={current_client.photo} alt=''/>
            </div>
            <div>
                <h1>{current_client.name}</h1>
            </div>
        </div>
        <div className='OrdersAreaAdmin-orders'>
            <div>
                {
                    orders.map((order, i) => (
                      (order.userID === current_client._id)&&
                        <div key={i}>
                            <div>
                                <img src={order.img} alt=''/>
                                <h3>{order.name}</h3>
                            </div>
                            <div className='order-info'>
                                <h4>piece price: {order.price}$</h4>
                                <h4>quantity: {order.qnt}</h4>
                            </div>
                            <div className='delete-order'>
                                <FaRegTrashAlt />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default OrdersAreaAdmin;