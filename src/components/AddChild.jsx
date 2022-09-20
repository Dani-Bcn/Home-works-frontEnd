import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function AddChild() {
  const storedToken = localStorage.getItem('authToken');
  const date = new Date();  
  const actualYear = date.getFullYear();
  const[tasks, setTasks] =useState(null)    
  const navigate = useNavigate();
  const [child, setChild] = useState({
    name: '',  
    yearOfBirth:'',
    imageUrl:'',
    tasks:[],
    points:0,
    pointsCup:0,
    cups:0,
    goalTasks:0,
    taskDone:0,
  })
  // In case of multiple file upload:
  // const [imageUrls, setImageUrls] = useState([]);
  // const [imgForUser, setImgForUser] = useState([]);  
  const handleChange = (e) => { 
    setChild(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const handleUploadImg  = async (e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/child/upload`, uploadData, { headers: { Authorization: `Bearer ${storedToken}` }});
      // console.log(response.data.fileUrl);
      setChild(prev => {
        return {
          ...prev,
          imageUrl: response.data.fileUrl
        }
      })
      // In case of multiple file upload
      // setImageUrls(prev => [...prev, response.data.fileUrl]);
      // setImgForUser(prev => [...prev, e.target.files[0].name]);
    } catch (error) {
      console.error(error);
    }
  }; 
  const handleSubmit = async (e) => {  
    e.preventDefault();
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/child`, { name: child.name, yearOfBirth: child.yearOfBirth ,  tasks:child.tasks, imageUrl:child.imageUrl, points: child.points, cups: child.cups, pointsCup: child.pointsCup, goalTasks: child.goalTasks, taskDone: child.taskDone}, { headers: { Authorization: `Bearer ${storedToken}` } });           
        toast.success('Project created successfully')
        navigate("/ListChilds")
    } catch (error) {
      console.log(error);
    }
  }  
  return ( 
    <div>
      <form onSubmit={handleSubmit}>      
        <input type="text" name="name" placeholder="Name" value={child.name} onChange={handleChange} />
        <input type="number" min="1980"  max={actualYear} name="yearOfBirth" placeholder="YearOfBirth" value={child.yearOfBirth} onChange={handleChange} />      
        <input type="file" onChange={(e)=>{handleUploadImg(e)}} />
        <input type="number" min="0"  name="points" placeholder="Points" value={child.points} onChange={handleChange} />      
        <input type="number" min="0"  name="cups" placeholder="Cups" value={child.cups} onChange={handleChange} />
       
        <button type="submit">Save</button>   
      </form>
    </div>
  ) 
}
