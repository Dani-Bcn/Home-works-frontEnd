/* eslint-disable array-callback-return */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink ,useNavigate} from 'react-router-dom';
export default function ListChilds() {
  const navigate = useNavigate()
  // const params = useParams(); then use with params.id
  const [childs, setChilds] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/child/`); 
        //console.log(response.data.data[0].name);
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
                  
          <h6  onClick={()=>navigate(`/InfoChild/${ele._id}`)}> Name: {ele.name}</h6>
               <img src={ele.image} width="100" alt="" />
               </div>
            ))}          
        </div>)}
      {!childs && <p>Childs not found</p>}
    </div>
  )
}

        
 