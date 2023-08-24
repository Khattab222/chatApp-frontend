import React, { useContext } from 'react'
import { chatcontext } from '../../context/ChatContext'
import { Box } from '@mui/material';
import SingleChat from './SingleChat';

const ChatBox = ({socket}) => {
  const {selectedchat,getAllChats,allChats,setSelectedchat}= useContext(chatcontext);

  return (
    <Box 
    display={{xs:selectedchat?'flex':'none',md:'flex'}}
    flexDirection='column'
    p={2}
    bgcolor='info.contrastText'
    width={{md:'68%',xs:'100%'}}
    borderRadius='10px'
    mx='5px'
    
    >
      <SingleChat socket={socket}/>
    </Box>
  )
}

export default ChatBox
