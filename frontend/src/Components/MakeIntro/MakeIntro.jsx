import React,{useState} from 'react'
import { makeIntro } from '../../services/intros'
import { useNavigate } from 'react-router-dom';

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
        Create A New Intro!
        <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={name} onChange={e => handleChange(e)} placeholder="name"/> <br/>
        <input type="text" name="job" value={job} onChange={e => handleChange(e)} placeholder="job"/> <br/>
        <input type="text" name="hobbies" value={hobbies} onChange={e => handleChange(e)} placeholder="hobbies"/> <br/>
        <button type="submit">Create Intro</button>
        <button type="button" onClick={handleReturn}>Dashboard</button>
        </form>
    </div>
  )
}
