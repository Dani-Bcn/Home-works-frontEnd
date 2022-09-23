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
          {child.map((ele)=>(
              <NavLink   key={ele._id} className='cardChild' to={`/PageChild/${ele._id}`}>                
                  <h3>What tasks do I have for today? </h3>
                  <img src={ele.imageUrl}  alt="img_Child" />                      
                  <h3>{ele.name}</h3>               
              </NavLink>                                          
            ))}              
          </div> 
        )}      
          {!isChilds &&(
            <div className='marginPage'>
            <h5>We don't have children yet, let's add them</h5>
            <button className='butt'onClick={()=>navigate("/AddChild")}>Add new child</button>
          </div>        
        ) }
      </div>
    )}
  </div>
  )
}