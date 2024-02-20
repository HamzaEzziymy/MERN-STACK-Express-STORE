import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAdmin, getConversations, getUser } from './redux/asyncThunkFuncs';
import { IoMdSend } from 'react-icons/io';
import axios from 'axios';

function Message() {
    // const api = "http://192.168.137.1:8080";
    const api = "http://localhost:8080";

    const dispatch = useDispatch();
    const txt_input_value = useRef("");
    const { conversations, loading_conversations } = useSelector(state => state.database);
    const [conver, setConver] = useState([]);

    //  get the current date time
    const currentdate = new Date();
    var time = currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + "  " + currentdate.getHours() + ":" + currentdate.getMinutes();
    
    // useEffect on dispatch
    useEffect(() => {
        dispatch(getConversations());
        dispatch(getUser());
    },[conver])


    // handel sendMessage function
    const handleSendMsg = async () => {
        if(txt_input_value.current.value.length > 0){
            await axios.put(`${api}/sendMessage`, {_id:conversations[0]._id,from:"client", to:"admin", msg: txt_input_value.current.value, time: time})
            .then(res => setConver(res.data))
            .catch(error => console.log(error))
            txt_input_value.current.value = ""
        }
    }

  return (
    <div className='messages-client'>
        <div>
            <h1>Texting Admin</h1>
            <div className='conversation'>
                <div className='conversation-area'>
                    {!loading_conversations
                        ?conversations[0].conversation.map((msg, i) => (
                            msg.from === "admin"
                            ?
                                <div key={i} className='from-admin'>
                                    <div>
                                        <h4>{msg.msg}</h4>
                                        <i>{msg.time}</i>
                                    </div>
                                </div>
                            :
                                <div key={i} className='to-admin'>
                                    <div>
                                        <h4>{msg.msg}</h4>
                                        <i>{msg.time}</i>
                                    </div>
                                </div>
                        ))
                        :""
                    }
                </div>
                <div className='message-input' onKeyDown={ e => (e.key==="Enter"&&handleSendMsg())}>
                    <div className='input'>
                        <input type='text' placeholder='enter message' ref={txt_input_value}/>
                    </div>
                    <div className='btn'><IoMdSend onClick={() => handleSendMsg()}/></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Message;