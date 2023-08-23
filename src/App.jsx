
import { useContext, useEffect } from 'react';
import './App.css'
import axios from 'axios'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LayoutRouter from './LayoutRouter';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import Chatpage from './pages/Chatpage';
import { io } from "socket.io-client"
import { UserContext } from './context/UserContext';
const socket = io('http://localhost:5000')

function App() {

const {loginuser} = useContext(UserContext)
useEffect(() => {
  

  return () => {
    socket.emit('leaveRoom', loginuser._id);
  }
}, [])



const router = createBrowserRouter([
  {path:'/',element:<LayoutRouter/>,children:[
    {index:true,element:<Home/>},
    {path:'/chat',element:<Chatpage socket={socket}/>},
  ]}
])




  return <div className='App'>
  <RouterProvider router={router}/>
  <ToastContainer />
  </div>
}

export default App
