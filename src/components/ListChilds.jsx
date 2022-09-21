/* eslint-disable array-callback-return */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink ,useNavigate} from 'react-router-dom';

export default function ListChilds() {
const storedToken = localStorage.getItem('authToken');
const navigate = useNavigate()
// const params = useParams(); then use with params.id
const [childs, setChilds] = useState([]);
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
  return (
    <div >
      {childs && (
        <div> 
            {childs.map((ele)=>(// cuando el map está entre parentesis utilizamos parentesis en el callback de map.              
                  <div key={ele._id} className="cardChildren">                  
                  <NavLink to={`/InfoChild/${ele._id}`}>                          
                  <img  src={ele.imageUrl} width="100" alt="imgchild" />    
                  <h1>{ele.name}</h1>  
                  </NavLink>           
               </div>
            ))}    
           <button onClick={()=>navigate("/AddChild")}>Add new child</button>
        </div>)}
      {!childs && <p>Childs not found</p>}
    </div>
  )
}

        
 