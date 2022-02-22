
import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUsers } from '../../services/intros'

export default function Intros({currentUser}) {
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
                <li>
                    <h1>{`Username: ${user.user_name}`}</h1>
                    <h2>{`Email: ${user.user_email}`}</h2>
                    <h3>{`Role: ${user.role}`}</h3>
                    <h4>{`Id: ${user.user_id}`}</h4>
                    <h5>{user.intro.map((intro)=>{
                        return(
                            <>
                            <p>{intro.hobbies}</p>
                            <Link to={`/dashboard/intros/${intro.intro_id}`}>{intro.intro_id}</Link>
                            </>
                        )
                    })}</h5>
                </li>
            </div>
            )})
            : <div>
                <h1>No Intros Here, Partner</h1>
                <button onClick={handleCreate}>Make A Intro</button>
            </div>}
            <button onClick={handleNav}>Dashboard</button>
    </div>
  )
}
