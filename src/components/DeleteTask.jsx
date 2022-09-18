import axios from 'axios';
import React,{useState, useEffect} from 'react';

const DeleteTask = () => {
    const [task, setTask] = useState()
    useEffect(()=>{
        const getTaskId = async ()=>{
            task = await axios.post(`${process.env.REACT_APP_API_URL}/child/${id}`,)
        }
    },[])
    const deleteTasks = async ()=>{
        try{
                await axios.post(`${process.env.REACT_APP_API_URL}/task/${id}`,)
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div>            
        </div>
    );
}
export default DeleteTask;
