  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import { useParams, useNavigate, NavLink } from 'react-router-dom';

  export default function InfoChild() {

  const navigate = useNavigate() 
  const {id} = useParams() 
  const date = new Date();  
  const actualYear = date.getFullYear();
  console.log(actualYear)
  const params = useParams(); //then use with params.id
  const [child, setChild] = useState(null);
  
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
  }, []);  
  //Eliminar niñ@
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
  const handleEdit=(()=>{
    console.log("Hola")
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
             <h1 >{child.name}</h1>
             <h6> Age {actualYear - child.yearOfBirth}</h6>   
             <img width={100} src={child.imageUrl}/>   
            {child.tasks.map(e=>{
              return( 
                <div>
                    <h1 key={e._id}>{e.name}</h1>
                    <img width={100} src={e.imageUrl} alt="img task"/>                   
                </div>                          
              )                
            })}   
          </div>
        )}      
        {!child && <p>child not found</p>}
        <NavLink to={`/EditChild/${id}`}>
          <button >Edit child</button>
        </NavLink>
           
          <NavLink to="/ListTasks">
            <button>Add tasks</button>
          </NavLink>
          <button  onClick={()=>handleDelete()}>Delete child</button>
    </div>   
  )
} 