import React, {useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import { getIntro, deleteIntro } from '../../services/intros';

export default function Intro({currentUser}) {
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
                     <h1>{`Creator: ${element.name}`}</h1>
                     <h2>{`Occupation: ${element.job}`}</h2>
                     <p>{`interests: ${element.hobbies}`}</p>
                     <div>
                     <button onClick={handleDelete}>Delete</button>
                     <button onClick={handleEdit}>Edit</button>
                     <button onClick={handleReturn}>Back</button>
                     </div>
                </>
            )
        })}
    </div>
  )
}
