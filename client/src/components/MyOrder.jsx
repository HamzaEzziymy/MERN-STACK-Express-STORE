import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaCcMastercard, FaCcPaypal, FaCcVisa, FaRegTrashAlt } from "react-icons/fa";
import { getOrders, getUser } from './redux/asyncThunkFuncs';
import { useNavigate } from 'react-router-dom';

function MyOrder() {
    const dispatch = useDispatch();
    const { loading_orders, orders } = useSelector(state=>state.database);
    // -------------------get the products from slice--------
    useEffect(() => {
        dispatch(getOrders());
        dispatch(getUser())
    }, [dispatch]);

    // -----------------calc prices--------------
      const ordersPrices = orders.reduce((a, order) => a + order.price*order.qnt, 0);
      const shippingPrices = orders.reduce((a, order) => a + order.shipping, 0);

  return (
    <div className='myorders'>
        {!loading_orders?<>
        <div className='orders'>
            {orders.map((order,i)=>(
                <div key={i} className='myorder'>
                    <div className='myorder-product'>
                        <h3 className='myorder-name' >{order.name}</h3>
                        <img className='myorder-img' src={order.img} alt={order.name}/>
                    </div>
                    <div className='myorder-desc'>
                        <p>{order.description}</p>
                        <div>
                            <h2>{order.price} $</h2>
                            <div><button>+</button> {order.qnt} <button>-</button></div>
                            <FaRegTrashAlt className='trash-icon' />
                        </div>
                        <p className='Shipping'>+ Shipping: {order.shipping}$</p>
                    </div>
                </div>
            ))}
        </div>
        <div className='totale-orders'>
            <div className='prices'><p>Totale orders</p> <p>{ordersPrices.toFixed(2)}$</p></div>
            <div className='prices'><p>Totale Shipping</p> <p>{shippingPrices.toFixed(2)}$</p></div>
            <div className='prices'><h2>Totale price</h2> <h2>{(ordersPrices+shippingPrices).toFixed(2)}$</h2></div>
            <button>Buy now</button>
            <div className='bank-cards'>
                <fieldset>
                    <legend>
                        <h1>Buy whit this cart</h1>
                    </legend>
                    <div className='cards-icons'>
                        <div><FaCcPaypal /></div>
                        <div><FaCcMastercard /></div>
                        <div><FaCcVisa /></div>
                    </div>
                </fieldset>
            </div>
        </div>
        </>
        :<div className='loading-img'>
            <img src='https://usagif.com/wp-content/uploads/loading-96.gif' alt=''/>
        </div>
        }
    </div>
  )
}

export default MyOrder;