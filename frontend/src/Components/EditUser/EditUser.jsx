import React, {useState, useEffect} from 'react'
import {Box, TextField, Button} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { userEdit, getUser} from '../../services/users'

export default function EditUser() {
let navigate = useNavigate()
let {id} = useParams()

const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password:""
})

useEffect(()=>{
const setPreviousInput = async (id) => {
    const res = await getUser(id)
    let currentUser = res.data[0];
    setInputs({name:currentUser.user_name, email: currentUser.user_email})
}
setPreviousInput(id)
},[])



let {name, email, password} = inputs;

    const handleChange = e => {
        const {name, value} = e.target;
        setInputs((prevInputs)=>({
            ...prevInputs,
            [name]: value
        }));
    };

    const handleReturn = async e => {
        e.preventDefault()
        navigate("/dashboard")
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        await userEdit(id, inputs)
        navigate("/dashboard/intros")
    }

  return (
    <div>
       <Box sx={{p:1, border: '1px solid gray', width:'60%', m: '20px auto 0', borderRadius: '12px', display:'flex', flexDirection:'column', alignItems:'center'}}>
       <h1>Update User</h1>
        <form onSubmit={handleSubmit}>
        <TextField className='edit field name' type="text" name="name" value={name} onChange={e => handleChange(e)} placeholder="name"/> <br/>
        <TextField className='edit field email' type="text" name="email" value={email} onChange={e => handleChange(e)} placeholder="email"/> <br/>
        <TextField className='edit field password' type="text" name="password" value={password} onChange={e => handleChange(e)} placeholder="password"/> <br/>
        <Button type="submit">Update User</Button>
        <Button type="button" onClick={handleReturn}>Dashboard</Button>
        </form>
        </Box>
    </div>
  )
}
