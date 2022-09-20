import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from "framer-motion"

export default function Signup() {
  const [user, setUser] = useState({
    username: '',
    email: ''
  })
  const [password, setPassword] = useState('');
  const [passwordControl, setPasswordControl] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  useEffect(() => {
    if (password !== passwordControl) {
      setErrorMessage("Passwords don't match")
    } else {
      setErrorMessage(undefined)
    }
    // eslint-disable-next-line
  }, [passwordControl])
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, { username: user.username, email: user.email, password });
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }
  return (
    <motion.div className='containerSignUp'    
    >
      <motion.form onSubmit={handleSubmit}
       animate={{
        scale:[2,2],
        y:[-500,300,0]
      }}
      transition={{
        duration:[1.5]
      }}   
      // transition={{ repeat: Infinity, duration: 2 }}
      >
        <label>Username</label>
        <input   className='inp' required type="text" name="username" value={user.username} onChange={handleChange} />
        <label>Email</label>
        <input   className='inp' required type="email" name="email" value={user.email} onChange={handleChange} />
        <label>Password</label>
        <input  className='inp' required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value) } />
        <label>Repeat the password</label>
        <input  className='inp' required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button  className='butt' type="submit">Sign up</button>
      </motion.form>
    </motion.div>
  )
}
