import React from 'react'
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../services/users';

export default function Dashhome({currentUser}) {
  let navigate = useNavigate();
  const handleClick = async () => {
    const res = await signOut();
    if(res === true){
      navigate("/");
    }
  }
  return (
    <div>
        {currentUser.role === 'admin' ? <h1>Welcome To The Admin Dashboard!</h1>:<h1>Welcome To The Dashboard!</h1>}
        <p>Still waiting for that user data...</p>
        <button onClick={handleClick}>Sign Out</button>
    </div>
  )
}
