import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { findAllByTestId } from '@testing-library/react';

export default function PageChild() {
const navigate = useNavigate()
const {id} = useParams() 
const [child, setChild] = useState(null);
const [points, setPoints] = useState(0)
const textCongratulations =
[
  "Congratulations, you have achieved 30 more points",
  "Congratulations, keep it up !!",
  "Today you are doing well!!!",
  "Well done !!!",
  "You are doing great!!!",
  "You're the best!!!",
  "Mom will be very fifty with you!!!",
]

const random = Math.floor(Math.random() * textCongratulations.length)
const handleTaskDone = async (objectTask)=>{ 
  Swal.fire({
    icon: 'success',
    title: textCongratulations[random],
    showConfirmButton: false,
    timer: 1000
  })
  // console.log(objectTask._id) 
  try{  
    console.log(objectTask._id)  
      await axios.put(`${process.env.REACT_APP_API_URL}/child/addPoints/${id}/${objectTask._id}`)       
      setPoints(!points)        
  }catch(error){
    console.log(error)
  }    
} 
useEffect(() => {
  const getData = async () => {
    try {      
      const getChild = await axios.get(`${process.env.REACT_APP_API_URL}/child/${id}`);  
      console.log(child)                   
       setChild(getChild.data.data)       
    } catch (error) { 
      console.error(error); 
    } 
  } 
  getData();
}, [points]);    
return (
  <div>      
      {child && (
        <div>      
          <h2>These are my tasks for today</h2>        
           <h1 >{child.name}</h1> 
           <img width={100} src={child.imageUrl}/> 
           <h3> Points : {child.points}</h3>
          <h3> Cups : {child.cups}</h3>
          {child.tasks.map(e=>{
            return(            
              <div key={e._id} onClick={()=>handleTaskDone(e)}>
                  <h1 >{e.name}</h1>
                  <img width={100} src={e.imageUrl} alt="img task"/>              
                  <h3> Points : {e.points}</h3>                                 
              </div>                           
            )                
          })}
          <NavLink to='/Sectionchilds'><button>Done</button></NavLink>
        </div>
      )}      
      {!child && <p>child not found</p>}
  </div>   
)
} 