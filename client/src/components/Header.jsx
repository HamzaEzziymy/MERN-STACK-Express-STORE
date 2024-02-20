import React, { useEffect, useRef, useState } from 'react';
import { IoMenuSharp, IoSearchSharp, IoCloseSharp } from "react-icons/io5";
import { FaShoppingCart, FaHome, FaHeart } from "react-icons/fa";
import {motion} from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Menu from './Menu';
import { getLikes, getOrders, getProducts } from './redux/asyncThunkFuncs';


function Header() {
    const dispatch = useDispatch();

    const [start_Searching, setStart_Searching] = useState(false);
    // const input_search = useRef();
    const [input_search, setInput_search] = useState("");

    const [menuDisplay, setMenuDisplay] = useState(false);
    const { likes, loading_likes, orders, loading_orders, products, loading_products } = useSelector(state=>state.database);
    
    // ---------------------dispatching the funcs-------
    useEffect(() => {
        dispatch(getOrders());
        dispatch(getProducts());
        dispatch(getLikes());
    }, [dispatch]);

    // ---------------------------display menu func-------------
    const menuDisplayFunc = ()=> {
        if(menuDisplay){
            setMenuDisplay(false);
        }else{
            setMenuDisplay(true);
        }
    }

    // ---------------------------search-func--------------------
    const search = () => {
        if(input_search.length > 1){
            setStart_Searching(true)
        }else{
            setStart_Searching(false)
        }
    }
  return (
    <div className='header'>
      <div id='shadowing'></div>
        <div className='menu-btn'>
            <i className='menu-icon'>
                {menuDisplay
                    ?<IoCloseSharp onClick={menuDisplayFunc} className='icon'/>
                    :<IoMenuSharp onClick={menuDisplayFunc} className='icon'/>
                }
            </i>
            {menuDisplay
                &&<motion.div animate={{y:400}} className='menu-content'>
                    <Menu/>
                </motion.div>
            }
        </div>
        <div className='logo'><h1>Xpress</h1></div>
        <div className='search-bar'>
            <div className='search-input'>
                <input onInput={() => search()} onChange={e => setInput_search(e.target.value)} type='search' placeholder='Search about product'/><i className='search-icon'><IoSearchSharp/></i>
            </div>
            {start_Searching&&
                <div className='search-content'>
                    {!loading_products&&
                    products.map((product, i)=>(
                        <>
                        {
                            (product.name.toLowerCase().search(input_search.toLowerCase())!==-1)&&(
                                <Link key={i} to={product._id}>
                                    <div>
                                        <p>{product.name}</p>
                                        <img src={product.imgs[0]} alt=" " />
                                    </div>
                                </Link>

                            )
                        }
                        </>
                    ))
                    }
                </div>
            }
        </div>
        <div className='my-bar'>
            <div>
                <Link to="/">
                    <FaHome className='icon'/>
                </Link>
            </div>
            <div>
                <Link to="orders">
                   <FaShoppingCart className='icon'/><span className='notifca'>{(!loading_orders&&orders)?orders.length:<img style={{width:"12px",height:"12px"}} src='https://usagif.com/wp-content/uploads/loading-96.gif' alt=''/>}</span>
                </Link>
            </div>
            <div>
                <Link to="likes">
                    <FaHeart className='icon'/><span className='notifca'>{(!loading_likes&&likes)?likes.length:<img style={{width:"12px",height:"12px"}} src='https://usagif.com/wp-content/uploads/loading-96.gif' alt=''/>}</span>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Header;