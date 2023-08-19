import { Avatar, Typography } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { UserContext } from '../../context/UserContext'
import socket from '../../socket/socket'

function ScrollableChat({selectedchat}) {
  const [allMessages, setallMessages] = useState([]);
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
        allMessages&&allMessages.map((message,i) =>{
          return(
            <Typography display={'flex'} alignItems='center' justifyContent={loginuser._id === message.from? "end":"start"} my={1} key={i} >
              {
                loginuser._id != message.from?<Avatar alt="Remy Sharp" src={getSender(loginuser,selectedchat)?.pic} /> : ""
              }
              
              <Typography style={{padding:'5px',borderRadius:'8px',marginLeft:'5px',backgroundColor:loginuser._id != message.from? "#BEE3F8":"#89F5D0"}}>

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
