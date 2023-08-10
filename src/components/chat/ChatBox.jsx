import React, { useContext } from 'react'
import { chatcontext } from '../../context/ChatContext'
import { Box } from '@mui/material';

const ChatBox = () => {
  const {selectedchat,getAllChats,allChats,setSelectedchat}= useContext(chatcontext);
console.log(selectedchat);
  return (
    <Box 
    display={selectedchat?'flex':'none'}
  
    >
        single chat
    </Box>
  )
}

export default ChatBox
