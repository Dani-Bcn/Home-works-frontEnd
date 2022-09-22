/* eslint-disable array-callback-return */

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { NavLink , useParams, useNavigate} from 'react-router-dom';
import DeleteTask from './DeleteTask';

export default function ListTasks() {
  const {id} = useParams()
  console.log(id)
  const navigate = useNavigate()
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
  const handleDelete= async(e)=>{  
    console.log(e)
      try {      
        await axios.delete(`${process.env.REACT_APP_API_URL}/task/${e}`);               
       navigate("/Tasks")
      } catch (error) { 
        console.error(error); 
      } 

   
  }
  return (
  <div >
      <NavLink to="/CreateTask"><button className='butt'>Create task</button></NavLink>             
      {task && (
        <div className='containerListTasks' > 
          {task.map((ele)=>(// cuando el map está entre parentesis utilizamos parentesis en el callback de map.         
            <div key={ele._id}className='cardTasks' >
              <h3> {ele.name}</h3>        
              <img src={ele.imageUrl}/>     
              <h2>Points  {ele.points}</h2>
                <NavLink to={`/EditTask/${ele._id}`}><button>Edit task</button></NavLink> 
              <button onClick={()=>handleDelete(ele._id)}>Delete task</button>                   
            </div>             
          ))}       
        </div>)}
      {!task && <p>Tasks not found</p>}
    </div>
  )
}      