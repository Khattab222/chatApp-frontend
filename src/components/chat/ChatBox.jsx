import React, { useContext } from 'react'
import { chatcontext } from '../../context/ChatContext'

const ChatBox = () => {
  const {getChat}=useContext(chatcontext)
  return (
    <div>
        ChatBox
    </div>
  )
}

export default ChatBox
