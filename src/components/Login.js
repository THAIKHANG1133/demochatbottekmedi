import React, { useState } from 'react'
import '../style/styleLogin.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import logo from '../image/logo.png'


function Login() {
    const [name,setName]=useState('')
    const [phone,setPhone]=useState('')
    
    const register=()=>{
        window.location.href = "/home"
        localStorage.setItem("name", name);
        localStorage.setItem("phone", phone);
    }
    return (
        <div>
            <div className='body-login'>
                <img src={logo} className='logo-tekmedi'/>
                {/* <p className='title'>CHATBOT CRM</p> */}
                <div className='form-register-chat'>
                    <TextField
                        className='input-register'
                        required
                        id="outlined-required"
                        label="Họ và Tên"
                        onChange={(e)=>{setName(e.target.value); console.log(e.target.value)}}

                    />
                    <TextField
                        className='input-register'
                        required
                        id="outlined-required"
                        label="Số điện thoại"
                        onChange={(e)=>{setPhone(e.target.value); console.log(e.target.value)}}
                    />
                 
                     <Button variant="contained" className='btn-register-chat' onClick={register}>
                        Start chat
                    </Button>
                   
                </div>
            </div>
        </div>
    )
}

export default Login