import React, { useState } from 'react'
import { FaRegUser } from 'react-icons/fa';
import { LuMessageCircle } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion';
import Notifications from './Notifications';


function Menu() {

  const [show_notif, setShow_notif] = useState(false);

  const show_notif_func = () =>{
    if(show_notif){
      setShow_notif(false)
    }else{
      setShow_notif(true)
    }
  }
  return (
    <div className='menu'>
      <div><Link to="profile"><FaRegUser className='icon' /></Link></div>
      <div><Link to="messages"><LuMessageCircle className='icon' /></Link></div>
      <div>
        <IoMdNotificationsOutline className='icon' onClick={show_notif_func}/>
        {show_notif &&
          <motion.div animate={{x:133}}>
            <Notifications/>
          </motion.div>
        }
      </div>
    </div>
  )
}

export default Menu;