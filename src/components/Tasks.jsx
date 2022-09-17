/* eslint-disable array-callback-return */

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { NavLink , useParams} from 'react-router-dom';

export default function ListTasks() {
  const {id} = useParams()
  const [child, setChild] = useState(null)
  const [task, setTask] = useState(null); 
  const[noRepaeatTasks, setNoRepeatTasks] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/task/`);       
        setTask(response.data.data)
      } catch (error) {
        console.error(error); 
      }
    }
    getData();
  }, [])
return (
  <div>
    <p>Tasks</p>
      {task && (
        <div> 
          {task.map((ele)=>(// cuando el map está entre parentesis utilizamos parentesis en el callback de map.         
            <div key={ele._id} >
            <h3> {ele.name}</h3>         
            <img src={ele.imageUrl}/>
              <p>Points  {ele.points}</p>
                <NavLink to={`/EditTask/${ele._id}`}><button>Edit task</button></NavLink> 
              </div>             
            ))}       
               <NavLink to="/CreateTask"><button>Create task</button></NavLink>
             

        </div>)}
      {!task && <p>Tasks not found</p>}
    </div>
  )
}      