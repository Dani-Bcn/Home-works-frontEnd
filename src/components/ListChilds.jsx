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
    <div>
      <p>Childs</p>
      {childs && (
        <div> 
            {childs.map((ele)=>(// cuando el map está entre parentesis utilizamos parentesis en el callback de map.
              
               <div key={ele._id} >                  
                  <NavLink to={`/InfoChild/${ele._id}`}>
                    <h3> See {ele.name}</h3>
                    <img  src={ele.imageUrl} width="100" alt="" />    
                  </NavLink>           
               </div>
            ))}    
           <button onClick={()=>navigate("/AddChild")}>Add new child</button>
        </div>)}
      {!childs && <p>Childs not found</p>}
    </div>
  )
}

        
 