import React ,{useEffect,useState ,useContext}from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function SectionChilds() {
const storedToken = localStorage.getItem('authToken');
const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
const navigate = useNavigate()
const [child, setChild] = useState([]);
let isChilds =false
if(child.length !== 0){
  isChilds=true
}else{
  isChilds=false
}
useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/child/mine`,{ headers: { Authorization: `Bearer ${storedToken}` }});
        setChild(response.data.data)
      } catch (error) {
        console.error(error);
      }
    } 
    getData(); 
  }, []);
  return (
    <div >    
      {isLoggedIn && (
      <div > 
      {isChilds && (
        <div>
          <h4>Children's section</h4> 
          <div className='containerListTasks'>                  
          {child.map((ele)=>(
            <div key={ele._id} className='cardChild'>
              <h3>What tasks do I have for today? </h3>   
              <NavLink to={`/PageChild/${ele._id}`}>
                <div >   
                  <img src={ele.imageUrl}  alt="img_Child" />                      
                  <h2>{ele.name}</h2>                  
                </div>
              </NavLink> 
            </div>                                 
          ))}              
          </div>        
        </div> 
        )}      
          {!isChilds &&(
            <div className='marginPage'>
            <h4>We don't have children yet, let's add them</h4>
            <button className='butt'onClick={()=>navigate("/AddChild")}>Add new child</button>
          </div>        
        ) }
      </div>
    )}
  </div>
  )
}