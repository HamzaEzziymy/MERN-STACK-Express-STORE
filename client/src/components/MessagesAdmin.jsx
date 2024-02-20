import React, { useEffect, useState } from 'react';
import MessageAreaAdmin from './MessageAreaAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/asyncThunkFuncs';
import { useNavigate } from 'react-router-dom';

function MessagesAdmin() {
  const history = useNavigate()
  const current_user_login = localStorage.current_user_login;
  const dispatch = useDispatch();
  const {user, loading_user} = useSelector(state => state.database);

  useEffect(() => {
    dispatch(getUser());
  }, [])

  const [current_user_id, setCurrent_user_id] = useState(null);

  const handelMessageBtn = (client) =>{
    setCurrent_user_id(client)
  }

  return (
    <>
      {current_user_login?
        <div className='messages-admin'>
            <div className='message-area'>
              {current_user_id?<MessageAreaAdmin current_clientP={current_user_id}/>
              :<h1>Welcom Admin!</h1>}
            </div>
            <div className='clients-area'>
              {!loading_user&&user.map((client, i) => (
                <div  key={i}>
                  <div className='client' onClick={()=>handelMessageBtn(client)}>
                    <div>
                      <img src={client.photo} />
                    </div>
                    <div>
                      <h2>{client.name}</h2>
                    </div>
                  </div>
                  <hr/>
                </div>
                ))
              }
            </div>
        </div>
      :history("/login")}
    </>
  )
}

export default MessagesAdmin;