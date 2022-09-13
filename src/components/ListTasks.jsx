/* eslint-disable array-callback-return */

import React, { useEffect, useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default function ListTasks() {
  // const params = useParams(); then use with params.id

  const [tasks, setTasks] = useState(null);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/task/`); 
        //console.log(response.data.data[0].name);
        setTasks(response.data.data)

      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);
const handleClick=((e)=>{
  console.log(e)
})
  return (
    <div>
      <p>Tasks</p>
      {tasks && (
        <div> 
            {tasks.map((ele)=>(// cuando el map está entre parentesis utilizamos parentesis en el callback de map.
         
                <div key={ele._id} >
               <h6 > Task : {ele._id}</h6>         
               <img onClick={(e)=>handleClick(e)} src={ele.image} width="100" alt="image" />
               <p>Points  {ele.points}</p>
               </div>             
            ))}          
        </div>)}
      {!tasks && <p>Tasks not found</p>}
    </div>
  )
}

        
 

 