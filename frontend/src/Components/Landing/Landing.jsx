import React from 'react'
import {Link} from 'react-router-dom'
import { AppBar, Toolbar, Button, Paper} from '@mui/material'
import './Landing.css'

export default function Landing() {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar disableGutters>
          Welcome
        </Toolbar>
      </AppBar>
      <Paper className='landing card' elevation={3}>
        <h1 className='landing header'>Welcome To The Introduction App</h1>
        <p>This is my first PERN stack application ever but enough about me - sign up and store your Introductions today</p>
        <div className='btn group'>
        <Button className='btn login' size='medium' variant='contained'><Link className='btn-link signup' to="/register">Sign Up</Link></Button> 
        <Button className='btn signup' size='medium' variant='outlined' color='primary'><Link className='btn-link login'to="/login">Log In</Link></Button>
        </div>
      </Paper>
    </div>
  )
}
