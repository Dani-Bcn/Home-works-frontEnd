/* eslint-disable array-callback-return */

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Count() {
const { user } = useContext(AuthContext)
  
  const [count, setCount] = useState([]);

  useEffect(() => {   
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/`); 
        console.log(response)
        setCount(response.data.data[0])
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);
  return (
    <div>     
      <p>Count</p>
      {count && (
        <div>    
            <h6 > Name  {user.username}</h6>
            <h6 > Email {user.email}</h6>
            <button>Edit</button>         
        </div>
        )}
      {!count && <p>count not found</p>}
     </div>
  )
}