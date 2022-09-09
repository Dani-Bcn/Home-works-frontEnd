import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';
import ListTasks from './components/ListTasks';
import ListChilds from './components/ListChilds';
import Count from './components/Count'
import InfoChild from './components/InfoChild'

function App() {
  return (
    <div className="App">
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ListChilds" element={<ListChilds />} />
        <Route path="/ListTasks" element={<ListTasks />} />
        <Route path="/Count" element={<Count />} />
        <Route path="/InfoChild/:id" element={<InfoChild />} />
        <Route path="/private" element={<IsPrivate><PrivateView/></IsPrivate>}/>
        <Route path="*" element={<ErrorPage />} />     
      </Routes>
    </div>
  );
}

export default App;
