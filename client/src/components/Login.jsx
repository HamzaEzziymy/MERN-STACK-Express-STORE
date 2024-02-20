import axios from 'axios';
import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const history = useNavigate();
    const api = "http://localhost:8080";
    const [incorect_info_label, setIncorect_info_label] = useState("");
    const [input_type, setInput_type] = useState("password");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const change_input_type = () => {
        if(input_type === "password"){
            setInput_type("text");
        }else{
            setInput_type("password");
        }
    }


    // handle login
    const handleLogin = async () => {
        if(!password || !login){
            setIncorect_info_label("input its empty!")
        }else{
            return await axios.post(`${api}/login`,  {login, password})
            .then(res =>{
                if(res.data === "Login or Password incorect!"){
                    setIncorect_info_label(res.data)
                }else{
                    localStorage.current_user_login = res.data[0]._id;
                    // history("../profile")
                    window.location.reload(false)
                }
            })
            .catch(error => console.log(error));
        }
    }

  return (
    <>{!localStorage.current_user_login?
        <div className='login-area'>
            <div>
                <h1>Login</h1>
                <div className='form'>
                    <div className='login'>
                        <input type='text' onChange={e => (setLogin(e.target.value), setIncorect_info_label(""))} placeholder='Login'/>
                    </div>
                    <div className='password'>
                        <input type={input_type} onChange={e => (setPassword(e.target.value), setIncorect_info_label(""))} placeholder='Password'/>
                        <div className='icon' onClick={() => change_input_type()}>
                            {input_type==="password"?<FaRegEye/>:<FaRegEyeSlash/>}
                        </div>
                    </div>
                    <div className='inc-info'>
                    {incorect_info_label}
                    </div>
                    <div className='btns'>
                        <button onClick={handleLogin}>Login</button><Link to="/signup">Sign Up</Link>
                    </div>
                    <div className='foget-pass'>
                        <Link>Foget password</Link>
                    </div>
                </div>
            </div>
        </div>
    :history("/profile")}</>
  )
}

export default Login