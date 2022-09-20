import React, { useEffect, useState } from 'react';
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

useEffect(() => { 
    const getData = async () => {   
        try {      
            const getChild = await axios.get(`${process.env.REACT_APP_API_URL}/child/${id}`);   
                             
             setChild(getChild.data.data) 
            
             setTimeLeisure(parseInt(child.taskDone / child.goalTasks * 100)   )
              if(timeLeisure ===0){
                setTimeLeisure("No tasks done")
             console.log(timeLeisure)
             }
           
              
          } catch (error) {  
            console.error(error); 
          } 
        } 
    getData();    
}, []);     
return (   
    <div>  
       
        {timeLeisure && (
            <div>
                  <h1>{timeLeisure}</h1> 
            <table>          
                <tbody>
                    <h1>Earned leisure time today</h1> 
                   
                          
                     
  
                   
                    <tr>
                        <th> 0% tasks done</th>    
                        <th>+25% tasks done</th>
                        <th>+50% tasks done</th>
                        <th>+75% tasks done</th>
                        <th>+100% tasks done</th>
                    </tr>
                    <tr>
                        <th>0 min games o tv or mobile</th>
                        <td>30 min games o tv or mobile</td>
                        <td>60 min games o tv or mobile</td>
                        <td>190 min games o tv or mobile</td>
                        <td>120 min games o tv or mobile</td>
                    </tr>
                </tbody>            
            </table>
            </div>
               
        )}

    </div>
  )
}
