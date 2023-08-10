
import { useEffect } from 'react';
import './App.css'
import axios from 'axios'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LayoutRouter from './LayoutRouter';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import Chatpage from './pages/Chatpage';

function App() {





const router = createBrowserRouter([
  {path:'/',element:<LayoutRouter/>,children:[
    {index:true,element:<Home/>},
    {path:'/chat',element:<Chatpage/>},
  ]}
])




  return <div className='App'>
  <RouterProvider router={router}/>
  <ToastContainer />
  </div>
}

export default App
