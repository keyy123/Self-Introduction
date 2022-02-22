import React, {useState, useEffect} from 'react'
import { signOut } from '../../services/users'
import { useNavigate, Routes, Route } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Dashhome from '../Dashboard-Home/DashHome'
import Intros from '../Intros/Intros'
import Intro from '../Intro/Intro'
import MakeIntro from '../MakeIntro/MakeIntro'
import EditIntro from '../EditIntro/EditIntro'

export default function Dashboard({currentUser}) {
  const [user, setUser] = useState([])
 useEffect(() => {
  window.localStorage.getItem('user');
 }, [])
 
 useEffect(() => {
   setUser(user)
  window.localStorage.setItem('user', currentUser.role);
}, [user])



  return(
 <div>
  
<Routes>
    <Route path="/" element={<Layout currentUser={currentUser}/>}>
      <Route index element={<Dashhome currentUser={currentUser}/>}/>
      <Route path="intros" element={<Intros currentUser={currentUser}/>}/>
      <Route path="intros/:id" element={<Intro currentUser={currentUser}/>}/>
      <Route path="edit-intro/:id" element={<EditIntro currentUser={currentUser}/>} />
      <Route path="make-intro" element={<MakeIntro/>}/>
    </Route>
</Routes>

</div>
 )
}


