import React, {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { updateIntro } from '../../services/intros';

export default function EditIntro() {
    let {id} = useParams();
    let navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: "",
        job: "",
        hobbies:""
    })
    
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
        Edit An Intro!
        <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={name} onChange={e => handleChange(e)} placeholder="name"/> <br/>
        <input type="text" name="job" value={job} onChange={e => handleChange(e)} placeholder="job"/> <br/>
        <input type="text" name="hobbies" value={hobbies} onChange={e => handleChange(e)} placeholder="hobbies"/> <br/>
        <button type="submit">Update Intro</button>
        <button type="button" onClick={handleReturn}>Dashboard</button>
        </form>
    </div>
  )
}
