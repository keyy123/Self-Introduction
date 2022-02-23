import React,{useState} from 'react';
import {Box, TextField, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { signUp } from '../../services/users';
export default function Signup() {
let navigate = useNavigate()

const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password:""
})

let {name, email, password} = inputs;

const handleChange = e => {
 setInputs({...inputs, [e.target.name]: e.target.value})
}

const handleSubmit = async e => {
    e.preventDefault()
    await signUp(inputs)
    navigate('/login')
}
const handleReturn = async e => {
  e.preventDefault()
  navigate("/")
}

  return (
    <div>
      <Box sx={{p:1, border: '1px solid gray', width:'60%', m: '20px auto 0', borderRadius: '12px', display:'flex', flexDirection:'column', alignItems:'center'}}>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
        <TextField className='signup field name' type="text" name="name" value={name} onChange={e => handleChange(e)} placeholder="name"/> <br/>
        <TextField className='signup field email' type="email" name="email" value={email} onChange={e => handleChange(e)} placeholder="email"/> <br/>
        <TextField className='signup field password' type="password" name="password" value={password} onChange={e => handleChange(e)} placeholder="password"/> <br/>
        <div className='signup btn-group'>
        <Button type="submit">Sign Up</Button>
        <Button type="button" onClick={handleReturn}>Home</Button>
        </div>
        </form>
        </Box>
    </div>
  )
}

