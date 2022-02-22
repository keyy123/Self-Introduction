import React from 'react'
import {useState, useEffect} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { verify } from './services/users';

import Dashboard from './Components/Dashboard/Dashboard';
import Landing from './Components/Landing/Landing';
import Signup from './Components/SignUp/Signup';
import Login from './Components/LogIn/Login';

function App() {

const [auth, setAuth] = useState(false);
const [currentUser, setCurrentUser] = useState()

const checkAuthStatus = async () => {
  try {
    const res = await verify();
    res === true ? setAuth(true) : setAuth(false) 
  } catch (e) {
    console.error(e.message)
  }
}

function RequireAuth({children, element}){
  let isAuth = checkAuthStatus();
  return isAuth ? children : <Navigate to={element}/>
}

useEffect(() => {
  checkAuthStatus();
}, [])

const setUserAuth = x => {
  setAuth(x)
};

console.log(auth)
  return (
    <>
     <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/register" element={<Signup auth={auth} setAuth={setAuth}/>}/>
        <Route path="/login/*" element={<Login auth={auth} setAuth={setAuth} setCurrentUser={setCurrentUser} currentUser={currentUser}/>}/>
        <Route path="/dashboard/*" element={<Dashboard currentUser={currentUser} setCurrentUser={setCurrentUser}/> }/>

     </Routes>
    </>
  );
}




export default App;
