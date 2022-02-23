import React, {useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import { getIntro, deleteIntro } from '../../services/intros';
import {Button, Paper} from '@mui/material';

import './Intro.css'
export default function Intro() {
    const [oneIntro, setOneIntro] = useState()

    let {id} = useParams();
    let navigate = useNavigate()
    
    useEffect(() => {
    const findIntro = async() =>{
        const res = await getIntro(id);
        let arr = []
        arr.push(res)
        setOneIntro(arr);
        console.log(oneIntro);
    }
    findIntro();    
    }, []);

    const handleDelete = async()=>{
        await deleteIntro(id);
        navigate("/dashboard")
    }

    const handleEdit = () => {
         navigate(`/dashboard/edit-intro/${id}`)
    }

    const handleReturn = () => {
        navigate(`/dashboard/intros`)
    }

    return (
    <div>
        {oneIntro?.map((element)=>{
            return(
                <>
                <Paper elevation={3} sx={{m: 5, p: 3}}>
                     <h1>{`Creator: ${element.name}`}</h1>
                     <h2>{`Occupation: ${element.job}`}</h2>
                     <h3>{`interests: ${element.hobbies}`}</h3>
                     <div className='intro btn-group'>
                     <Button onClick={handleDelete}>Delete</Button>
                     <Button onClick={handleEdit}>Edit</Button>
                     <Button onClick={handleReturn}>Back</Button>
                     </div>
                </Paper>
                </>
            )
        })}
    </div>
  )
}
