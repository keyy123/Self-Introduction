import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Layout({currentUser, children}) {
  return (
    <div>
        <nav>
            <ul>
                {
                currentUser.role === 'admin'
                ?<li><Link to="/dashboard/intros">See All Users [Admin Only]</Link></li> 
                :<li><Link to="/dashboard/intros">Profile/All Intros </Link></li>
                }
                <li><Link to="/dashboard/make-intro">Create Intro</Link></li>
            </ul>
        </nav>
    <hr />
    {children}
    <Outlet/>
    </div>
  );
}
