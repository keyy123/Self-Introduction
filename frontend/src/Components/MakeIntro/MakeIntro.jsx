import React,{useState} from 'react'
import { makeIntro } from '../../services/intros'
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Button } from '@mui/material';
import './MakeIntro.css'
export default function MakeIntro() {
let navigate = useNavigate()

const [inputs, setInputs] = useState({
    name: "",
    job: "",
    hobbies:""
})

let {name, job, hobbies} = inputs;

const handleChange = e => {
    setInputs({...inputs, [e.target.name]: e.target.value})
}

const handleSubmit = async e => {
    e.preventDefault()
    const createIntro = await makeIntro(inputs)
    console.log(createIntro)
    navigate('/dashboard')
}
const handleReturn = async e => {
  e.preventDefault()
  navigate("/dashboard")
}

  return (
    <div>
      <Box sx={{p:1, border: '1px solid gray', width:'60%', m: '20px auto 0', borderRadius: '12px', display:'flex', flexDirection:'column', alignItems:'center'}}>
        <h1>Create A New Intro!</h1>
        <form onSubmit={handleSubmit}>
        <TextField className='create field name' type="text" name="name" value={name} onChange={e => handleChange(e)} placeholder="name"/> <br/>
        <TextField className='create field job' type="text" name="job" value={job} onChange={e => handleChange(e)} placeholder="job"/> <br/>
        <TextField className='create field hobbies' type="text" name="hobbies" value={hobbies} onChange={e => handleChange(e)} placeholder="hobbies"/> <br/>
        <Button type="submit">Create Intro</Button>
        <Button type="button" onClick={handleReturn}>Dashboard</Button>
        </form>
        </Box>
    </div>
  )
}
