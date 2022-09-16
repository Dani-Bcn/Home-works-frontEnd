import React ,{useEffect,useState ,useContext}from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
export default function SectionChilds() {
  const storedToken = localStorage.getItem('authToken');
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
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
<div className='containerSection'> 
 {isChilds && (
  <div>
     <h2>Children's section</h2> 
        <div > 
          <p>What tasks do I have for today?</p>
     
            {childs.map((ele)=>(// cuando el map está entre parentesis utilizamos parentesis en el callback de map.    
               <NavLink  key={ele._id} to={`/PageChild/${ele._id}`}>
                  <div className='containerShows'>                
                    <h3>{ele.name}</h3>
                    <img src={ele.imageUrl}  alt="img_Child" />                           
               </div>
              </NavLink>                    
            ))}              
        </div>        
  </div>
 
        )}
      {!childs && <p>Childs not found</p>}
    </div>
   )}
    </div>
  )
}