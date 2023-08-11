import React, { useContext } from 'react'
import SideDrawer from '../components/header/SideDrawer'
import { Box } from '@mui/material'
import MyChats from '../components/chat/MyChats'
import ChatBox from '../components/chat/ChatBox'
import { chatcontext } from '../context/ChatContext'

const Chatpage = () => {
  const {selectedchat}= useContext(chatcontext)

  return (
    <div style={{width:'100%'}}>


     <SideDrawer/>
   
  <Box sx={{display:'flex',justifyContent:'space-between',minHeight:'90vh',p:'10px'}} >

   <MyChats/>
 
    

      <ChatBox/>
  </Box>
    

    </div>
  )
}

export default Chatpage
