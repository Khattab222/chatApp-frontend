import { Avatar, Typography } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { UserContext } from '../../context/UserContext'
import socket from '../../socket/socket'
import { chatcontext } from '../../context/ChatContext'

function ScrollableChat() {
  const [allMessages, setallMessages] = useState([]);
  const {selectedchat} = useContext(chatcontext)
  const {loginuser} = useContext(UserContext)
  useEffect(() => {
   if (selectedchat?.messages) {
    setallMessages(selectedchat.messages)
   }

  }, [selectedchat])
  



  const getSender = (loginuser,chat) =>{
    return loginuser._id === chat.POne?._id? chat.PTwo :chat.POne
  }
  
  return (
    <ScrollableFeed >
      {
        selectedchat.messages&&selectedchat.messages.map((message,i) =>{
          return(
            <Typography component={'span'} variant={'body2'} display={'flex'} alignItems='center' justifyContent={loginuser._id === message.from? "end":"start"} my={1} key={i} >
             
              {
                 !selectedchat.isGroupChat?  loginuser._id != message.from?<Avatar alt="Remy Sharp" src={getSender(loginuser,selectedchat)?.pic} /> : "" :""
           
              }
              
              <Typography
              bgcolor={loginuser._id != message.from? "info.main":"info.light"}
              style={{padding:'5px',borderRadius:'8px',marginLeft:'5px'}}>

              {message.messageText}
              </Typography>
              
              </Typography>
          )
        })
      }
    </ScrollableFeed>
  )
}

export default ScrollableChat
