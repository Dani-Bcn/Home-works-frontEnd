import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditChild() {
const navigate = useNavigate();
const { id } = useParams();
const [task, setTask] = useState(null);
//primero obtenemos las datos de Task
  useEffect(() => {
    const getData = async () => {
      try {
        const getTask = await axios.get(`${process.env.REACT_APP_API_URL}/task/${id}`,);
        setTask(getTask.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [id])
//Vamos guardando los valoes conforme escribimos
  const handleChange = (e) => {
    setTask(prev => { 
      return {
        ...prev,        
        [e.target.name]: e.target.value       
      }
    })  
  }
  //Editar tareas
  const handleSubmit = async (e) => {
      //console.log(child)
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/task/${id}`, {name: task.name,  points:task.points} );
      navigate(`/Tasks`)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <h1>Edit task</h1>
      {!task && <p>Loading</p>}
      {task && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={task.name} onChange={handleChange} />
          <input type="number"  placeholder="Points" min={0}  name="points" value={task.points} onChange={handleChange} />
          <button type="submit">Save changes</button>
        </form>
       )}
       </div>
     )
   } 