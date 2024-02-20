import React, { useEffect, useRef, useState } from 'react';
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { getConversations } from './redux/asyncThunkFuncs';
import ScrollToBottom from 'react-scroll-to-bottom';
import axios from 'axios';

function MessageAreaAdmin(props) {
    // const api = "http://192.168.137.1:8080";
    const api = "http://localhost:8080";

    const dispatch = useDispatch();
    const current_client = props.current_clientP;
    const {conversations, loading_conversations} = useSelector(state => state.database);
    const txt_input_value = useRef();
    const [conver, setConver] = useState([]);

    //  get the current date time
    const currentdate = new Date();
    var time = currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + "  " + currentdate.getHours() + ":" + currentdate.getMinutes();
    

    useEffect(() => {
        dispatch(getConversations());
    },[conver])
    

    const handleSendMsg = async () => {
        if(txt_input_value.current.value.length > 0){
            await axios.put(`${api}/sendMessage`, {_id:current_client._id,from:"admin", to:"client", msg: txt_input_value.current.value, time: time})
            .then(res => setConver(res.data))
            .catch(error => console.log(error))
            txt_input_value.current.value = ""
        }
    }

  return (
    <div className='MessageAreaAdmin'>
        <div className='Msg-header'>
            <div>
                <img src={current_client.photo} />
            </div>
            <div>
                <h1>{current_client.name}</h1>
            </div>
        </div>
        <div className='messages'>
            {((!loading_conversations))?(
                conversations.find(conver => conver._id === current_client._id).conversation.map((msg, i) => (
                    <div key={i}>
                        {
                            msg.from=="admin"
                            ?
                            <div className='admin-msg'>
                                <div>
                                    <h3>{msg.msg}</h3>
                                    <i>{msg.time}</i>
                                </div>
                            </div>
                            :
                            <div className='client-msg'>
                                <div>
                                    <h3>{msg.msg}</h3>
                                    <i>{msg.time}</i>
                                </div>
                            </div>
                        }
                    </div>
                ))
            ):""}
        </div>
        <div className='msg-form' onKeyDown={ e => (e.key==="Enter"&&handleSendMsg())}>
            <div className='input'>
                <input type='text' ref={txt_input_value}/>
            </div>
            <div className='btn'><IoMdSend onClick={handleSendMsg}/></div>
        </div>
    </div>
  )
}

export default MessageAreaAdmin;