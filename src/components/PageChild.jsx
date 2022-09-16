import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

export default function PageChild() {
const navigate = useNavigate() 
const {id} = useParams() 
const date = new Date();  
const actualYear = date.getFullYear();
console.log(actualYear)
const params = useParams(); //then use with params.id
const [child, setChild] = useState(null);
const [points, setPoints] = useState(0)
//Find child  by id
const handleTaskDone = async (objectTask)=>{ 
  console.log(objectTask._id)
 
  try{   
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
       setChild(getChild.data.data) 
      console.log(child)        
    } catch (error) { 
      console.error(error); 
    } 
  } 
  getData();
}, [points]);  
//Delete child by id
const handleDelete=()=>{
  const getData = async () => {
    try {      
      await axios.delete(`${process.env.REACT_APP_API_URL}/child/${id}`);               
     navigate("/ListChilds")
    } catch (error) { 
      console.error(error); 
    } 
  } 
getData();      
}
//Edit child by id

const handleEdit=(()=>{
   const getData = async () => {
    try {      
      await axios.put(`${process.env.REACT_APP_API_URL}/child/${id}`);               
     navigate("/EditChild")
    } catch (error) { 
      console.error(error); 
    } 
  }   
}) 
  
return (
  <div>      
      {child && (
        <div>    
          <h2>Your homework </h2> 
           <h1 >{child.name}</h1>
           <h6> Age {actualYear - child.yearOfBirth}</h6>   
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
        </div>
      )}      
      {!child && <p>child not found</p>}
  </div>   
)
} 