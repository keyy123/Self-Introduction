import React, {useState} from 'react';
import { useNavigate, Routes, Route} from 'react-router-dom';
import { login, verify } from '../../services/users';
import Dashboard from '../Dashboard/Dashboard';
import { TextField, Box, Button } from '@mui/material';
import './Login.css'

export default function Login({auth, setAuth, setCurrentUser, currentUser}) {
let navigate = useNavigate()

const [inputs, setInputs] = useState({
    email: "",
    password: ""
})

const {email, password} = inputs

const handleChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value});
}

const handleSubmit = async e => {
    e.preventDefault();
    try {
        const res = await login(inputs)
        const resp = await verify()
        console.log(res);
        setAuth(resp)
        if(auth){
            setCurrentUser(res)
            localStorage.setItem('role', res.role)
            localStorage.setItem('username', res.user_name)
            navigate("/dashboard")
        }
    } catch (e) {
        console.error(e.message)
    }
}

  return (
    <div>
        <Box sx={{p:1, border: '1px solid gray', width:'50%', m: '20px auto 0', borderRadius: '12px' }}>
        <h1 className='form header'>Login Form</h1>
        <form className="form login" onSubmit={(e)=>{handleSubmit(e)}}>
            <TextField sx={{m: '5px 0 10px'}} className="form email" type="text" name="email" value={email} onChange={(e)=>{handleChange(e)}} placeholder="email"/>
            <TextField sx={{m: '5px 0 10px'}} className="form password" type="password" name="password" value={password} onChange={(e)=>{handleChange(e)}} placeholder="password"/>
            <Button variant='text' className="form submit" type="submit">sign up</Button>
        </form>
        </Box>
    <Routes>
        <Route path="/dashboard/*" element={<Dashboard currentUser={currentUser} setCurrentUser={setCurrentUser}/> }/>
    </Routes>
    </div>

  
  )
}
