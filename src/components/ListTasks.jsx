/* eslint-disable array-callback-return */

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { NavLink , useParams} from 'react-router-dom';

export default function ListTasks() {
  //Tenemos el id porque ya estamos en la página con la ruta id del child
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
  }, []); 

useEffect(()=>{
 const getDataTasksChilds = async () => {
    try {      
      const getChild = await axios.get(`${process.env.REACT_APP_API_URL}/child/${id}`);                
      getChild.data.data.tasks.map((e)=> noRepaeatTasks.push(e._id))
      setChild(getChild.data.data)                  
    } catch (error) { 
      console.error(error); 
    } 
  } 
getDataTasksChilds()
},[])
//Add chores to child
  const handleAddTask = async (e) =>{   
  if(noRepaeatTasks.includes(e)){         
    }else{  
        try{   
          await axios.put(`${process.env.REACT_APP_API_URL}/child/addTask/${id}/${e}`)  
          toast.success('Add new task !')    
          noRepaeatTasks.push(e)
        }catch(error){ 
      console.log(error)
    } 
  } 
}
return (
  <div className='containerTasks'>
      {task && (
        <div> 
          {task.map((ele)=>(// cuando el map está entre parentesis utilizamos parentesis en el callback de map.         
            <div key={ele._id} >
            <h3> {ele.name}</h3>         
            <img src={ele.imageUrl} onClick={()=>handleAddTask(ele._id)} width="100" alt="image"/>
              <p>Points  {ele.points}</p>
              </div>             
            ))}            
            <NavLink to={`/InfoChild/${id}`}><button>Save tasks</button> </NavLink>      
        </div>)}
      {!task && <p>Tasks not found</p>}
    </div>
  )
}      