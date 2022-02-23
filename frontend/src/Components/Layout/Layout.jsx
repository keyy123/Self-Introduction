import React, {useState, useEffect} from 'react'
import { Link, Outlet } from 'react-router-dom'
import { AppBar, Toolbar } from '@mui/material';
import './Layout.css'

export default function Layout({currentUser, children}) {

//   function navAct(){
//   if(currentUser?.role === 'admin'){
//     return <li><Link className='nav list link admin' to="/dashboard/intros">See All Users [Admin Only]</Link></li>
//   } else if(currentUser?.role === 'user'){
//     return <li><Link className='nav list link user' to="/dashboard/intros">Profile/All Intros </Link></li>
//   } else if(currentUser === 'undefined'){
//     navigate("http://localhost:3000")
//   }
// }

const [role, setRole] = useState()

useEffect(() => {
  const navAction = async () => {
    const currentRole = localStorage.getItem("role")
    if(currentRole){
      setRole(currentRole)
      console.log(role);
    }
  }
  navAction()
}, [])


  return (
    <div>
      <AppBar position='static'>
        <Toolbar disableGutters>
        <nav>
            <ul className='nav list'>
                {
                role === 'admin' 
                ?<li><Link className='nav list link admin' to="/dashboard/intros">See All Users [Admin Only]</Link></li> 
                :<li><Link className='nav list link user' to="/dashboard/intros">Profile/All Intros </Link></li> 
                }
                <li><Link className='nav list link' to="/dashboard/make-intro">Create Intro</Link></li>
            </ul>
        </nav>
        </Toolbar>
        </AppBar>
    {children}
    <Outlet/>
    </div>
  );
}
