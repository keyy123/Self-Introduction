import React, {useState, useEffect} from 'react'
import { signOut } from '../../services/users'
import { useNavigate, Routes, Route, useLocation, useRoutes } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Dashhome from '../Dashboard-Home/DashHome'
import Intros from '../Intros/Intros'
import Intro from '../Intro/Intro'
import MakeIntro from '../MakeIntro/MakeIntro'
import EditIntro from '../EditIntro/EditIntro'
import Landing from '../Landing/Landing'

export default function Dashboard({currentUser, auth}) {


  return(
 <div>
<Routes>
    <Route path="/" element={<Layout currentUser={currentUser}/>}>
      <Route index element={<Dashhome currentUser={currentUser}/>}/>
      <Route path="intros" element={<Intros />}/>
      <Route path="intros/:id" element={<Intro />}/>
      <Route path="edit-intro/:id" element={<EditIntro />} />
      <Route path="make-intro" element={<MakeIntro/>}/>
    </Route>
    <Route path="*" element={<Landing/>}/>
</Routes>
</div>
 )
}


