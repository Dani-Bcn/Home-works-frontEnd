/* eslint-disable array-callback-return */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ListTasks from './ListTasks';
export default function InfoChild() {
  const {id} = useParams() 
  const date = new Date();  
  const actualYear = date.getFullYear();
  console.log(actualYear)
  // const params = useParams(); then use with params.id
  const [child, setChild] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        console.log(id);
        const getChild = await axios.get(`${process.env.REACT_APP_API_URL}/child/${id}`);       
        setChild(getChild.data.data)
      } catch (error) {
        console.error(error);
      } 
    } 
    getData();
  }, []); 
  return (
    <div>     
        {child && (
          <div>      
             <h1 >{child.name}</h1>
             <h6> Age {actualYear - child.yearOfBirth}</h6>
             <img width={100} src={child.image}/>  
             {child.tasks.map((e)=>{
                  console.log(e)
             })}                                                  
          </div>
        )}
        {!child && <p>child not found</p>}
    </div>
  )
}