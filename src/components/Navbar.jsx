
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOutUser= ()=>{
    Swal.fire({
      title: 'You want to go?',
      showDenyButton: true,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
       logOutUser()
    } 
  })
}
return (
    <div className='nav'>
    
      <ul>
        <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/">Home</NavLink></li>
        {!isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/signup">Sign up</NavLink></li>}
        {!isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/login">Login</NavLink></li>}
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/ListChilds">Childs</NavLink></li>}
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/Tasks">Task</NavLink></li>}
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/User"><h3>{user.username} 👤 </h3></NavLink></li>}
      

        {/* {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/private">Private view</NavLink></li>} */}
        {isLoggedIn && <li><button onClick={() => handleLogOutUser()}>Log out</button></li>}
        <li><button onClick={() => navigate(-1)}>Go back</button></li>
      </ul>
    </div>
  )
}