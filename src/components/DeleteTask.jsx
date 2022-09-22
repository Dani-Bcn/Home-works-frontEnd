/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { NavLink , useParams} from 'react-router-dom';
export default function ListTasks() {
  //Tenemos el id porque ya estamos en la página con la ruta id del child
const {id} = useParams()
const [child, setChild] = useState(null)
const [task, setTask] = useState(null); 
var i =false

const handleDelete = async (e)=>{
  i =!i
    try{
        await axios.put(`${process.env.REACT_APP_API_URL}/Task/${e}`)
        toast.success('Delete task !')  
    }catch(error){
        console.log(error)
    }
}
  return (
    <div>
      <h2>What tasks do you want to delete?</h2> 
      <div className='containerListTasks'>
        {child && (
          child.tasks.map((e)=>{
            return (
              <div  className='cardTasks' onClick={()=>{handleDelete(e._id)}} key={e._id}>
                <h3>{e.name}</h3>
                <img src={e.imageUrl}></img>  
              </div>               
            )            
          }) 
        )}    
      </div>          
      <NavLink to="/ListChilds"><button>Done</button> </NavLink>                  
    </div>
  )
}      