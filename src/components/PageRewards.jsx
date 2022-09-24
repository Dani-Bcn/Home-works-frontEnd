import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";

import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

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
let  num = 0
useEffect(() => {  
    const getData = async () => {       

        try {      
            const getChild = await axios.get(`${process.env.REACT_APP_API_URL}/child/${id}`);                             
             setChild(getChild.data.data)        
           {if (timeLeisure === 0){
            setTimeLeisure("No tasks done")
           }else{
               return  setTimeLeisure( child.taskDone / child.goalTasks  )
           }        
        }                 
          } catch (error) {    
            console.error(error);     
          }    
        } 
    getData();    
}, [timeLeisure]);
    let percent = 0.75 
    let delay 
    let draw = {  
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i) => { 
            delay = 2 + i * 0.5; //Delay de la animación
            return {
                pathLength:percent, 
                opacity: 1,
                transition: {
                    pathLength: { delay, type: "spring", duration: 5, },
                    opacity: { delay, duration: 0.1 }
                }            
            };
        }
    };  
 useEffect(()=>{   
    const count=(()=>{  
      const coco =  setInterval(()=>{
            num ++
            setNumPercent(num)
   if(num >= (timeLeisure * 100)){ 
        clearInterval(coco)
    }
        },30)    
    }) 
    setTimeout(()=>count(),1000)      
 },[])
 console.log("gol") 
 console.log(timeLeisure)
return (  
    <div > 
            {timeLeisure && (                
        <div>
          
             <h4>Tasks done {child.taskDone} / {child.goalTasks}
                <br />
                {numPercent} % </h4>
 
         <div className='containerCircle'>     
            <motion.svg 
                width="75"
                height="100"
                viewBox="0 0 200 200"
                initial="hidden"
                animate="visible"
            >  
                <motion.circle
                    cx="100"
                    cy="100"
                    r="80" 
                    stroke="#00cc88" 
                    variants={draw}
                    custom={1} 
                />
            </motion.svg>
        </div>
        <h4>Today's rewards</h4>
            <h4>  {child.points} Points  </h4>
            </div>   
    )}   
           
    </div>   
  )
}
