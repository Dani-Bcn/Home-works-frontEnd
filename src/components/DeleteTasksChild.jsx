/* eslint-disable array-callback-return */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink , useParams} from 'react-router-dom';
export default function ListTasks() {
  //Tenemos el id porque ya estamos en la página con la ruta id del child
const {id} = useParams()
const [child, setChild] = useState(null)
const [task, setTask] = useState(null); 
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
      setChild(getChild.data.data)   
    } catch (error) { 
      console.error(error); 
    } 
  }   
  getDataTasksChilds() 
},[])  
const handleDelete = async (e)=>{
    try{
        await axios.put(`${process.env.REACT_APP_API_URL}/child/deleteTask/${id}/${e}`)
    }catch(error){
        console.log(error)
    }
}
  return (
    <div>
        <h1>What tasks do you want to delete?</h1>     
        {child && (
            child.tasks.map((e)=>{
                    return (
                    <div  onClick={()=>{handleDelete(e._id)}} key={e._id}>
                        <h3>{e.name}</h3>
                        <img src={e.imageUrl}></img>  
                    </div>               
                )            
            }) 
        )}                       
    </div>
  )
}      