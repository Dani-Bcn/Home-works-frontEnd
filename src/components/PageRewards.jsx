import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Cup from '../img/cup.png';
import Cup2 from '../img/cup2.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { isCompositeComponent } from 'react-dom/test-utils';

export default function PageRewards() {
const navigate = useNavigate() 
const {id} = useParams() 
const date = new Date();  
const actualYear = date.getFullYear();  
// console.log(actualYear)
const params = useParams(); //then use with params.id
const [child, setChild] = useState(null);
const [change, setChange] = useState(false)
const [timeLeisure, setTimeLeisure] = useState(0)
const [numPercent, setNumPercent] = useState(0)
const cupPaint =[]
const cup = [Cup2,Cup2,Cup2,Cup2,Cup2]
console.log(cup)

useEffect(() => {  
    const getData = async () => {
        try {      
            const getChild = await axios.get(`${process.env.REACT_APP_API_URL}/child/${id}`);                             
             setChild(getChild.data.data)        
         
               setTimeLeisure( child.taskDone / child.goalTasks * 100  )
           
                  
          } catch (error) {    
            console.error(error);     
          }     
        } 
        
    getData();     


}, [timeLeisure]);
let numCups
{child && (
  
  numCups = child.cups
  
  )}
    { for (let i = 0; i < numCups; i++) {     
  cupPaint.push(1)
} 
cupPaint.map((e,i)=>{
  return cup.splice(i,1,Cup) 
})   
   }

return (  
    <div className='backPageRewards'> 
        {child && (                
            <div>     
        <h4>Rewards for today</h4>             
                <h4>
                    Tasks done {child.taskDone} / {child.goalTasks}
                </h4>               
          <h4>  Points  :  {child.points} </h4>         
          <h4>You have minutes {child.points} of leisure time</h4>
          <hr />
          <h4>Rewards accumulated in this month</h4>
          <h4>  {child.cups}  : Cups</h4>
          <div>
                {cup.map((e, i)=>{
                return <img  className='imgCups' key={i} src={cup[i]} alt="" />
                })}
                  </div> 
          </div>      
        )}          
    </div>
  )
}