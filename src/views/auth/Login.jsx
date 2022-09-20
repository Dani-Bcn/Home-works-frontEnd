import axios from 'axios';
import React, { useState, useContext } from 'react';
import { motion } from "framer-motion"
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, user);
      toast.success('Welcome back!')
      storeToken(response.data.authToken);
      authenticateUser();
      navigate('../Sectionchilds');
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }
  return (
    <motion.div className='containerLogin'>  
      <motion.form onSubmit={handleSubmit}     
       animate={{
        scale:[2,2],
        y:[500,-300,0],
        dropbox:[0,0.8]
      }}
      transition={{
        duration:[1.5]
      }}>       
      <br />
         <label>Email</label>
          <input  className='inp' required type="email" name="email" value={user.email} onChange={handleChange} />
          <label>Password</label>
          <input  className='inp' required type="password" name="password" value={user.password} onChange={handleChange} />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button className='butt'  type="submit">Log in </button>
          <h1>{storeToken}</h1>      
      </motion.form>
    </motion.div>
  )
}
