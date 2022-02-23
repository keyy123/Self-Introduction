import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../services/users';
import { Button, Paper } from '@mui/material';
import './DashHome.css'

export default function Dashhome({currentUser}) {
  let navigate = useNavigate();
  const handleClick = async () => {
    const res = await signOut();
    if(res === true){
      navigate("/");
    }
  }

const [role, setRole] = useState()
const [username, setUsername] = useState()

useEffect(()=>{
  const checkRole = () => {
    const currentRole = localStorage.getItem("role")
    if(currentRole){
      setRole(localStorage.getItem("role"))
      setUsername(localStorage.getItem("username"))
      console.log(role, username);
    }
  }
  checkRole()
});


  return (
    <div>
        {role === 'admin' ? <h1>Welcome To The Admin Dashboard!</h1>:<h1>Welcome To The Dashboard!</h1>}
        <Paper elevation={3} sx={{m: 3, p: 3}}>
        <h2 className='home guide'>{`Welcome ${role} ${username}!`}</h2>
        <p className='home text'>Above you should see two options in the nav bar, See Profile which allows you to see your own personal information and the intros you've made! From this option, You can see a specific intro, update or delete it! The second option is to simply create an intro! The sign out button is self explanatory.</p>
        <Button className='home signout' variant='contained' onClick={handleClick}>Sign Out</Button>
        </Paper>
    </div>
  )
}
