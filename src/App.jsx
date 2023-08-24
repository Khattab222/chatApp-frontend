
import { useContext, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './App.css'
import axios from 'axios'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LayoutRouter from './LayoutRouter';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import Chatpage from './pages/Chatpage';
import { io } from "socket.io-client"
import { UserContext } from './context/UserContext';
import CssBaseline from '@mui/material/CssBaseline';
const socket = io('http://localhost:5000')

function App() {

const {loginuser} = useContext(UserContext)
useEffect(() => {
  

  return () => {
    socket.emit('leaveRoom', loginuser._id);
  }
}, [])


// dark mode
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const router = createBrowserRouter([
  {path:'/',element:<LayoutRouter/>,children:[
    {index:true,element:<Home/>},
    {path:'/chat',element:<Chatpage socket={socket}/>},
  ]}
])




  return <div className='App'>
    <ThemeProvider theme={darkTheme}>
  <RouterProvider router={router}/>
    <CssBaseline />
  <ToastContainer />
  </ThemeProvider>
  </div>
}

export default App
