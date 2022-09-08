import axios from 'axios';
import React,{useEffect, useState} from 'react';

const FindChilds = () => {

    const[childs, setchilds] = useState(null)
 
    useEffect(() => {     
             const getData = async ()=>{
            try{
                const data = await axios.get(`${process.env.REACT_APP_API_URL}/child`,)
                setchilds(data.data)     
                console.log(childs) 
            }catch(error){ 
                console.log(error)  
            }    
        }  
        getData()                
       
      }, []) 

    return ( 
        <div>
 
         {/* {childs.map((e)=>{  
                <h1>{e.name}</h1>
            })}   */}
        </div>
    );
}

export default FindChilds;
