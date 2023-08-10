import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserContextProvider } from './context/UserContext.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ChatContextProvider } from './context/ChatContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <UserContextProvider>
    <ChatContextProvider>
    <App />
    </ChatContextProvider>


  </UserContextProvider>
  </>,
)
