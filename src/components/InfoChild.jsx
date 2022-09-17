  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import { useParams, useNavigate, NavLink } from 'react-router-dom';

  export default function InfoChild() {
  const navigate = useNavigate() 
  const {id} = useParams() 
  const date = new Date();  
  const actualYear = date.getFullYear();
  console.log(actualYear)
  const params = useParams(); //then use with params.id
  const [child, setChild] = useState(null);
//Find child  by id
  useEffect(() => {
    const getData = async () => {
      try {      
        const getChild = await axios.get(`${process.env.REACT_APP_API_URL}/child/${id}`);   
        console.log(getChild.data.data)                    
         setChild(getChild.data.data)              
      } catch (error) { 
        console.error(error); 
      } 
    } 
    getData();
  }, []);  
  const handleConfirm=()=>{
    Swal.fire({
      title: 'Are you sure to delete child?',
      showDenyButton: true,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       handleDelete()
      } 
    })
  }  
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
  const resetPoints=()=>{
      const getData = async () => {
        try {      
          const getChild = await axios.get(`${process.env.REACT_APP_API_URL}/child/${id}`);   
                           
           setChild(getChild.data.data)   
                  console.log(child.points)  
                 
        } catch (error) { 
          console.error(error); 
        } 
      } 
      getData();
  

  }
  return (
    <div>      
        {child && (
          <div>      
             <h1 >{child.name}</h1>
             <h3> Age {actualYear - child.yearOfBirth}</h3>   
             <br />
             <img width={100} src={child.imageUrl}/> 
             <h3> Points : {child.points}</h3>    
             <h3> Cups : {child.cups}</h3>    
            {child.tasks.map(e=>{
              return( 
                <div key={e._id}>                
                    <h1 >{e.name}</h1>
                    <img width={100} src={e.imageUrl} alt="img_task"/>                                   
                </div>                                       
              )                
            })}                 
          </div>
        )}      
        {!child && <p>child not found</p>}
        <NavLink to={`/EditChild/${id}`}>
          <button >Edit child</button>
        </NavLink>           
        
          <NavLink to={`/ListTasks/${id}`}>
            <button>Add tasks</button>
          </NavLink>
          <NavLink to={`/DeleteTasksChild/${id}`}><button>Delete tasks</button></NavLink>
          <button onClick={()=>resetPoints()}>Reset Points</button>
          <button  onClick={()=>handleConfirm()}>Delete child</button>
    </div>   
  )
} 