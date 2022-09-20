
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
        /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        logOutUser() 
        navigate('/')
      } 
  })
 
}
return (
    <motion.div className='footer'
        animate={{
        y:[200,-100,0], 
        transition:{delay:2 ,duration:1.5}   
        }}
    >    
    <ul>
        <li>{isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/User">{user.username} 👤 </NavLink></li>}</li>
        <li>{isLoggedIn && <li><button onClick={() => handleLogOutUser()}>Log out</button></li>}</li>
    </ul>
    </motion.div>
  )
}