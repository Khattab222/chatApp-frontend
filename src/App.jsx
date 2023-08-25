
import { useContext, useEffect, useState } from 'react';
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
const [mode, setmode] = useState("light")
const {loginuser} = useContext(UserContext)
useEffect(() => {
  if (localStorage.getItem("mode")) {
    setmode(localStorage.getItem("mode"))
  }

  return () => {
    socket.emit('leaveRoom', loginuser._id);
  }
}, [])


// dark mode
const ThemeMode = createTheme({
  palette: {
    mode: mode,
  },
});

const router = createBrowserRouter([
  {path:'/',element:<LayoutRouter  />,children:[
    {index:true,element:<Home/>},
    {path:'/chat',element:<Chatpage setmode={setmode} mode={mode} socket={socket}/>},
  ]}
])




  return <div className='App'>
    <ThemeProvider theme={ThemeMode}>
  <RouterProvider router={router}/>
    <CssBaseline />
  <ToastContainer />
  </ThemeProvider>
  </div>
}

export default App
