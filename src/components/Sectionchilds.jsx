import React ,{useEffect,useState ,useContext}from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function SectionChilds() {
const storedToken = localStorage.getItem('authToken');
const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
const navigate = useNavigate()
console.log()
const [childs, setChilds] = useState("");
let isChilds =false
let text =""
if(childs.length !== 0){
  isChilds=true
  text =""
}else{
  isChilds=false
  text ="No child found"
}
useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/child/mine`,{ headers: { Authorization: `Bearer ${storedToken}` }});
        setChilds(response.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);
  return (
    <div>    
      {isLoggedIn && (
      <div > 
      {isChilds && (
        <div className='cardSectionChild'>
          <h2>Children's section</h2> 
        <div> 
                  
              {childs.map((ele)=>(
                <div className='cardChildren'>
                    <p>What tasks do I have for today? </p>   
                <NavLink  key={ele._id} to={`/PageChild/${ele._id}`}>
                  <div >                
                  <h4>{ele.name}</h4>
                <img src={ele.imageUrl}  alt="img_Child" />                           
                </div>
              </NavLink> 
                </div>
                                 
            ))}              
          </div>        
        </div> 
      )}      
      {!isChilds &&(
        <div className='cardSectionChild'>
          <h1>We don't have children yet, let's add them</h1>
          <button className='butt'onClick={()=>navigate("/AddChild")}>Add new child</button>
        </div>        
      ) }
      </div>
    )}
    </div>
  )
}