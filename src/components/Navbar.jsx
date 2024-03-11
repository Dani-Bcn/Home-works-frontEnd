
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import {motion} from "framer-motion"

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  console.log(user)
  const navigate = useNavigate();
  const handleLogOutUser= ()=>{
    Swal.fire({
      title: 'You want to go?',
      showDenyButton: true,
    }).then((result) => {
    if (result.isConfirmed) {
       logOutUser() 
       navigate('/')
    } 
  }) 
}
return (
    <div  className='bg-red'
    >    
      <div className='w-screen  h-20 flex bg-red-200 justify-around items-center'>
        {isLoggedIn &&<NavLink className={(element) => element.isActive ? 'selected' : ''} to="./Sectionchilds"><h3 className='text-red-600'>Kids</h3></NavLink>}   
        {!isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/signup"><h3>Sign up</h3></NavLink>}
        {!isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/login"><h3>Login</h3></NavLink>}
        {isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/ListChilds"><h3>Parents</h3></NavLink>}
        {isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/Tasks"><h3>Task</h3></NavLink>}  
        {isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/Help"><h3>Help</h3></NavLink>}  
      </div>    
    </div>
  )
}