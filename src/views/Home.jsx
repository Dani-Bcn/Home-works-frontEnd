import React ,{useEffect,useState ,useContext}from 'react'
import { NavLink ,useNavigate} from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import SectionChilds from '../components/Sectionchilds';
export default function Home() {

  const navigate =useNavigate
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
        <h1> Welcome to </h1>
          <br></br>
        <h1>Homework for kids</h1>
          {isChilds && (
                <SectionChilds/> 
                
          )}
          {!isChilds && (
                 <NavLink to="./AddChild"><button>Add new child</button></NavLink>
          )}  

    </div>
  )
}
