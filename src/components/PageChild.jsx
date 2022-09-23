import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function PageChild() {
const navigate = useNavigate()
const {id} = useParams() 
const [child, setChild] = useState(null);
const [points, setPoints] = useState(0)
const [done, setDone] = useState(true)
const textCongratulations =
[
  "Congratulations, you have achieved 30 more points !",
  "Congratulations, keep it up !",
  "Today you are doing well !",
  "Well done !",
  "You are doing great !",
  "You're the best !",
  "Mom will be very fifty with you !",
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
  if(child.tasks.length === 0 ){
    setDone(false)
  }   
} 
useEffect(() => {
  const getData = async () => {
    try {      
      const getChild = await axios.get(`${process.env.REACT_APP_API_URL}/child/${id}`);                     
       setChild(getChild.data.data)      
    } catch (error) { 
      console.error(error); 
    } 
  }  
  getData();  
}, [points]);   
return (
  <div >      
      {child && (
        <div>       
          <div className='cardPageChild' >         
            <img src={child.imageUrl}/>        
            <h1 >{child.name}</h1>  
              <pre>Points    {child.points}</pre>
              <pre>Cups        {child.cups}</pre>                   
          </div>      
          <div className='containerListTasks'>
              {child.tasks.map(e=>{
              return(            
                <div  className='cardTasks' key={e._id} onClick={()=>handleTaskDone(e)}>
                    <h2 >{e.name}</h2>
                    <img width={100} src={e.imageUrl} alt="img task"/>              
                    <h3> Points  {e.points}</h3>                                 
                </div>                           
              )  
                })}         
          </div>              
           
          <NavLink to='/Sectionchilds'><button>Done</button></NavLink>
        </div>
      )}      
      {!child && <p>child not found</p>}
  </div>   
)
} 