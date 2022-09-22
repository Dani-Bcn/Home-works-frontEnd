import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteTask = () => {
    const [task, setTask] = useState()
    
  const { id } = useParams();
    useEffect(()=>{
        const getTaskId = async ()=>{
            task = await axios.post(`${process.env.REACT_APP_API_URL}/child/${id}`,)
        }
    },[])
    const deleteTasks = async ()=>{
        try{
                await axios.post(`${process.env.REACT_APP_API_URL}/task/delete${id}`,)
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
