import React, { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Review from './Review'
import MyOrder from './MyOrder'
import MyLists from './MyLists'
import Fotter from './Fotter'
import NoteFoundPage from './NoteFoundPage'
import { useSelector } from 'react-redux'
import MessagesAdmin from './MessagesAdmin'
import OrdersListAdmin from './OrdersListAdmin'
import LikesListAdmin from './LikesListAdmin'
import Profile from './Profile'
import Login from './Login'
import SignUp from './SignUp'
import Message from './Message'
import AdminProfile from './AdminProfile'

function Allcomp() {
  const current_user_login = localStorage.current_user_login;

  const {adminID} = useSelector(state => state.database);
  
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path=':code' element={<Review/>}/>
        <Route path='profile' element={
        (current_user_login!== adminID)
          ?<Profile/>
          :<AdminProfile />
        }/>
        <Route path='orders' element={
          ((current_user_login!== adminID)&&current_user_login)
          ?<MyOrder/>
          :<OrdersListAdmin />
        }/>
        <Route path='likes' element={
          ((current_user_login!== adminID)&&current_user_login)
          ?<MyLists/>
          :<LikesListAdmin />
        }/>
        <Route path='messages' element={
          ((current_user_login!== adminID)&&current_user_login)
          ?<Message />
          :<MessagesAdmin />
        }/>
        <Route path='*' element={<NoteFoundPage/>}/>
      </Routes>
      <Fotter/>
    </BrowserRouter>
  )
}

export default Allcomp;