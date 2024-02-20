import React, { useEffect, useState } from 'react';
import LikesAreaAdmin from './LikesAreaAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { getLikes, getUser } from './redux/asyncThunkFuncs';
import { useNavigate } from 'react-router-dom';

function LikesListAdmin() {
  const history = useNavigate()
  const current_user_login = localStorage.current_user_login;
  const {user, loading_user, likes } = useSelector(state => state.database)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getLikes());
  },[])

  const num_likes = (id) => {
    return likes.filter(like => like.userID === id).length;
  }

  const [current_user_id, setCurrent_user_id] = useState(null);

  const handleLikesBtn = (client) =>{
    setCurrent_user_id(client)
  }

  return (
    <>
    {current_user_login?
      <div className='orders-admin-all'>
        <h1>Likes</h1>
        {!loading_user?
        <div className='orders-admin'>
            <div className='orders-area'>
              {current_user_id?<LikesAreaAdmin current_clientP={current_user_id}/>
              :<h1 className='wellcom-admin'>Welcom Admin!</h1>}
            </div>
            <div className='orders-clients-area'>
              {user.map((client, i) => (
                <div  key={i}>
                    <div className='orders-client' onClick={()=>handleLikesBtn(client)}>
                        <div>
                            <img src={client.photo} />
                        </div>
                        <div>
                            <h2>{client.name}</h2>
                        </div>
                        <div>
                            <h2 className='orders-num'>{
                              num_likes(client._id)
                            }</h2>
                        </div>
                    </div>
                    <hr/>
                </div>
                ))
              }
            </div>
        </div>
        :""}
      </div>
      :history("/login")}
    </>
  )
}

export default LikesListAdmin;