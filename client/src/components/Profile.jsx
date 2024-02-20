import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAdmin, getUser } from './redux/asyncThunkFuncs';
import { useNavigate } from 'react-router-dom';
import { LuLogOut } from 'react-icons/lu';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';

function Profile() {
// const api = "http://192.168.137.1:8080";
const api = "http://localhost:8080";

  const history = useNavigate()
  const current_user_login = localStorage.current_user_login;
  const dispatch = useDispatch();
  const [incoret_info, setIncoret_info] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [sex, setSex] = useState("");
  const {user, loading_user, admin, loading_admin} = useSelector(state => state.database);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAdmin());
  },[])

  const handleLogout = () => {
    if(window.confirm("do you really wana to logout?")){
      localStorage.removeItem("current_user_login")
      history("/login")
      window.location.reload(false)
    }
  }

  const handleEdit = async (id) => {
    if(!name || !age || !sex || !photoUrl){
      setIncoret_info("input have be no empty !")
    }else{
      await axios.put(`${api}/editProfile`,{name, age, sex, photoUrl, id})
      .then(window.location.reload(false))
      .catch(error => console.log(error))
    }
  }
  return (
    <>
      {current_user_login?
        <div className='profile'>
          {(!loading_user)?
          <>
            <div className='display-profile'>
              <div>
                <img src={user[0].photo} alt=''/>
                <h1>{user[0].name}</h1>
              </div>
              <hr/>
              <div className='profile-inof'>
                <div>
                  <div><div>Full name: </div><div className='info'> {user[0].name}</div></div>
                  <div><div>Login: </div><div className='info'>{user[0].login}</div></div>
                </div>
                <div>
                  <div><div>Age: </div><div className='info'>{user[0].age} years old</div></div>
                  <div><div>Sex: </div><div className='info'>{user[0].sex}</div></div>
                </div>
              </div>
              <button  onClick={handleLogout}>Log Out <LuLogOut style={{paddingTop:"3px"}}/></button>
            </div>
            <div className='edit-profile'>
              <div>
                <h1>Edit Profile</h1>
                <div className='inputs'>
                  <input type='text' placeholder='name' onChange={e => (setName(e.target.value), setIncoret_info(""))}/><br/>
                  <input type='number' placeholder='age' onChange={e => (setAge(e.target.value), setIncoret_info(""))}/><br/>
                  <input type='text' placeholder='photo url' onChange={e => (setPhotoUrl(e.target.value), setIncoret_info(""))}/><br/>
                  <input type='text' placeholder='sex' onChange={e => (setSex(e.target.value), setIncoret_info(""))}/><br/>
                  <p style={{color:"red"}}>{incoret_info}</p>
                  <button onClick={() => handleEdit(user[0]._id)}>Edit <FaEdit/></button>
                </div>
              </div>
            </div>
            </>
          :""}
        </div>
      :history("/login")}
    </>
  )
}

export default Profile;