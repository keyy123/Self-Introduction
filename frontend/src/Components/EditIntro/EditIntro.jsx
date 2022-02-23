import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { updateIntro, getIntro} from '../../services/intros';
import {Button, TextField, Box} from '@mui/material';
import './EditIntro.css';


export default function EditIntro() {
    let {id} = useParams();
    let navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: "",
        job: "",
        hobbies:""
    })

    useEffect(()=>{
        const prevData = async (id) => {
            const res = await getIntro(id)
            console.log(res)
            const intro = res
            setInputs({name: intro.name, job: intro.job, hobbies: intro.hobbies})
        }
        prevData(id)
    },[])

    let {name, job, hobbies} = inputs;
    
    const handleChange = e => {
        const {name, value} = e.target;
        setInputs((prevInputs)=>({
            ...prevInputs,
            [name]: value
        }));
    };
    
    const handleSubmit = async e =>{
        e.preventDefault()
        await updateIntro(id, inputs)
        navigate("/dashboard")
    }

    const handleReturn = async e => {
        e.preventDefault()
        navigate("/dashboard")
    }

  return (
    <div>
       <Box sx={{p:1, border: '1px solid gray', width:'60%', m: '20px auto 0', borderRadius: '12px', display:'flex', flexDirection:'column', alignItems:'center'}}>
        <h1>Edit An Intro!</h1>
        <form onSubmit={handleSubmit}>
        <TextField className='edit field name' type="text" name="name" value={name} onChange={e => handleChange(e)} placeholder="name"/> <br/>
        <TextField className='edit field job' type="text" name="job" value={job} onChange={e => handleChange(e)} placeholder="job"/> <br/>
        <TextField className='edit field hobbies' type="text" name="hobbies" value={hobbies} onChange={e => handleChange(e)} placeholder="hobbies"/> <br/>
        <Button type="submit">Update Intro</Button>
        <Button type="button" onClick={handleReturn}>Dashboard</Button>
        </form>
        </Box>
    </div>
  )
}
