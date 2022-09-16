import './App.css';

import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import SectionChilds from './components/Sectionchilds';
import PageChild from './components/PageChild';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';
import ListTasks from './components/ListTasks';
import ListChilds from './components/ListChilds';
import User from './components/User'
import InfoChild from './components/InfoChild'
import AddChild from './components/AddChild'
import EditChild from './components/EditChild'
import UpImages from './components/UpImages'
import DeleteTasksChild from './components/DeleteTasksChild'
function App() {
  return (
    <div className="App">
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SectionChilds" element={<SectionChilds />} />
        <Route path="/PageChild/:id" element={<PageChild />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ListChilds" element={<ListChilds />} />
        <Route path="/ListTasks/:id" element={<ListTasks />} />
        <Route path="/User" element={<User/>} />
        <Route path="/InfoChild/:id" element={<InfoChild />} />
        <Route path="/AddChild/" element={<AddChild />} />
        <Route path="EditChild/:id" element={<EditChild />} />
        <Route path="UpImages" element={<UpImages />} />
        <Route path="/private" element={<IsPrivate><PrivateView/></IsPrivate>}/>
        <Route path="*" element={<ErrorPage />} />  
        <Route path="DeleteTasksChild/:id" element={<DeleteTasksChild />} />     
      </Routes>
    </div>
  );
}
export default App;
