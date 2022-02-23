
import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUsers } from '../../services/intros'
import { Paper, Button } from '@mui/material'
import './Intros.css'
export default function Intros() {
    let navigate = useNavigate()
    const [allUsers, setAllUsers]= useState([])

useEffect(() => {
const getAllUsers = async () =>{
    let res = await getUsers()
    if(res){
    console.log(res);
    setAllUsers(res?.data)
}else{

}
}
getAllUsers()
}, [])

console.log(allUsers);
    
const handleNav = async e => {
    e.preventDefault()
    navigate("/dashboard")
}

const handleCreate = async e => {
    e.preventDefault()
    navigate("/dashboard/make-intro")
}

  return (
    <div>
        {allUsers.length > 0 ?
        allUsers?.map((user)=>{
            return(
            <div>
                <Paper elevation={1} sx={{m:5, p:2}}>
                    <h1>{`Username: ${user.user_name}`}</h1>
                    <h2>{`Email: ${user.user_email}`}</h2>
                    <h3>{`Role: ${user.role}`}</h3>
                    <h4>{`Id: ${user.user_id}`}</h4>
                    <h5>{user.intro.map((intro)=>{
                        return(
                            <>
                            <Link to={`/dashboard/intros/${intro.intro_id}`}>{intro.hobbies}<br/><br/></Link>
                            </>
                        )
                    })}</h5>
                </Paper>
            </div>
            )})
            : <div>
                <Paper elevation={1} sx={{m:5, p:2, display:'flex', flexDirection:'column', alignItems:'center'}}>
                <h1 style={{textAlign:'center'}}>No Intros Here, Partner</h1>
                <Button onClick={handleCreate}>Make A Intro</Button>
                </Paper>
            </div>}
            <Button variant='contained' className="intros home-btn" onClick={handleNav}>Dashboard</Button>
    </div>
  )
}
