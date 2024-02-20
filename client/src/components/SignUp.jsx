import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from './redux/slice';
import axios from 'axios';

function SignUp() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const api = "http://localhost:8080";
    const [incorect_info_label, setIncorect_info_label] = useState("");
    const [input_type, setInput_type] = useState("password");
    const [confirm_input_type, setConfirm_input_type] = useState("password");

    // info
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_password] = useState("");

    const change_input_type = () => {
        if(input_type === "password"){
            setInput_type("text")
        }else{
            setInput_type("password")
        }
    }

    const change_confirm_input_type = () => {
        if(confirm_input_type === "password"){
            setConfirm_input_type("text")
        }else{
            setConfirm_input_type("password")
        }
    }

    // handleSinup function
    const handleSignup = async () => {
        if(!password || !confirm_password || !login){
            setIncorect_info_label("input its empty!")
        }else{
            if(password !== confirm_password ){
                setIncorect_info_label("password deferent confirm password!")
            }else{
                if(password.length<6 || login.length<6){
                    setIncorect_info_label("password and login must be larger than 6 character!")
                }else{
                    return await axios.post(`${api}/signup`,  {login, password})
                    .then(res =>{
                        if(res.data === "login"){
                            history("../login")
                        }else{
                            setIncorect_info_label(res.data)
                        }
                    })
                    .catch(error => console.log(error));
                }
            }
        }
    }

  return (
    <>{!localStorage.current_user_login?
        <div className='signup-area'>
            <div>
                <h1>Sign-Up</h1>
                <div className='form'>
                    <div className='email'>
                        <input type='text' onChange={e => (setLogin(e.target.value), setIncorect_info_label(""))} placeholder='login'/>
                    </div>
                    <div className='password'>
                        <input type={input_type} onChange={e => (setPassword(e.target.value),setIncorect_info_label(""))} placeholder='Password'/>
                        <div className='icon' onClick={() => change_input_type()}>
                            {input_type==="password"?<FaRegEye/>:<FaRegEyeSlash/>}
                        </div>
                    </div>
                    <div className='confirm-password'>
                        <input type={confirm_input_type} onChange={e => (setConfirm_password(e.target.value), setIncorect_info_label(""))} placeholder='Confirm Password'/>
                        <div className='icon' onClick={() => change_confirm_input_type()}>
                            {confirm_input_type==="password"?<FaRegEye/>:<FaRegEyeSlash/>}
                        </div>
                    </div>
                    <div className='inc-info'>
                    {incorect_info_label}
                    </div>
                    <div className='btns'>
                        <button onClick={() => handleSignup()}>SignUp</button><Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    :history("../profile")}</>
  )
}

export default SignUp;