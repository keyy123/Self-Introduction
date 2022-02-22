import React from 'react'
import {Link} from 'react-router-dom'

export default function Landing() {
  return (
    <div>
        <h1>Welcome To The Introduction App</h1>
        <p>This is my first PERN stack application ever but enough about me - sign up and store your Introductions today</p>
        <Link to="/register">Sign Up</Link> 
        <Link to="/login">Log In</Link>
    </div>
  )
}
