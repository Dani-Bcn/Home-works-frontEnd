/* eslint-disable array-callback-return */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink ,useNavigate} from 'react-router-dom';
export default function ListChilds() {
const storedToken = localStorage.getItem('authToken');
let isChilds = false
const navigate = useNavigate()
// const params = useParams(); then use with params.id
const [childs, setChilds] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/child/mine`, { headers: { Authorization: `Bearer ${storedToken}` }});
        setChilds(response.data.data)
      } catch (error) {
        console.error(error);
      }
  }
    getData();
  }, []);  
  if(childs.length !== 0){
    isChilds=true 
  }else{
    isChilds=false
  }
  
  return (
    <div>       
      <br/>
      <button onClick={()=>navigate("/AddChild")}><h4>Add new child</h4></button>
      {childs && (
        <div className='containerListTasks'>       
            {childs.map((ele)=>(
              <NavLink key={ele._id} className="cardChildInfo"to={`/InfoChild/${ele._id}`}>                                            
                 <h5>Info</h5>
                <img  src={ele.imageUrl} width="100" alt="imgchild" />    
                <h3>{ele.name}</h3>  
              </NavLink>
            ))}        
        </div>)}      
        {!isChilds &&(
      <div className='marginPage'>
        <h4>We don't have children yet, let's add them</h4>
      </div>        
    ) }
    </div>
  )
}

        
 