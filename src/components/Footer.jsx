
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import {motion} from "framer-motion"

export default function Footer() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOutUser= ()=>{
    Swal.fire({
      title: 'You want to go?',
      width: 400,
      showDenyButton: true,
      }).then((result) => {
      if (result.isConfirmed) {
        logOutUser() 
        navigate('/')
      } 
    }) 
  }
  return (
    <div className=' w-screen h-20 bg-red-200 flex justify-around items-center '>    
    
        {isLoggedIn && <li><button onClick={() => navigate(-1)} className="styleIcon"></button></li>}
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/User"><h2>{user.username}⚙️</h2></NavLink></li>}
        {isLoggedIn && <li><button onClick={() => handleLogOutUser()}>Log out</button></li>}
   
    </div>
  )
}