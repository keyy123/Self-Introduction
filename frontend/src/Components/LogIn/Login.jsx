import React, {useState} from 'react';
import { useNavigate, Routes, Route} from 'react-router-dom';
import { login, verify } from '../../services/users';
import Dashboard from '../Dashboard/Dashboard';


export default function Login({auth, setAuth, setCurrentUser, currentUser}) {
let navigate = useNavigate()

const [inputs, setInputs] = useState({
    email: "",
    password: ""
})

const {email, password} = inputs

const handleChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value});
}

const handleSubmit = async e => {
    e.preventDefault();
    try {
        const res = await login(inputs)
        const resp = await verify()
        console.log(res);
        setAuth(resp)
        if(auth){
            setCurrentUser(res)
            navigate("/dashboard")
        }
    } catch (e) {
        console.error(e.message)
    }
}

  return (
    <div>
        <h1>Login Form</h1>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
            <input type="text" name="email" value={email} onChange={(e)=>{handleChange(e)}} placeholder="email"/>
            <input type="password" name="password" value={password} onChange={(e)=>{handleChange(e)}} placeholder="password"/>
            <button type="submit">sign up</button>
        </form>
    <Routes>
        <Route path="/dashboard/*" element={<Dashboard currentUser={currentUser} setCurrentUser={setCurrentUser}/> }/>
    </Routes>
    </div>

  
  )
}
