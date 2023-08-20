import { Avatar, Box, Button, Input, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { chatcontext } from '../../context/ChatContext';
import { ArrowBackIos, Padding, Visibility } from '@mui/icons-material';
import { UserContext } from '../../context/UserContext';
import ProfileModal from '../Authentication/ProfileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import { toast } from 'react-toastify';
import ScrollableChat from './ScrollableChat';
import socket from './../../socket/socket';


let selectedChatCompare;
let Room ;
const SingleChat = () => {
  const {selectedchat,getAllChats,allChats,messages,setSelectedchat,getchatData,sendMessage}= useContext(chatcontext);
  const {loginuser}= useContext(UserContext)
  const [openmodal, setopenmodal] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);

  const [istyping, setistyping] = useState(false)

  useEffect(() => {
    socket.emit('joinchat', selectedchat?._id)

    selectedChatCompare= selectedchat;

  }, [selectedchat])

useEffect(() => {
  
socket.emit('setup',loginuser);
socket.on('connected',()=>setSocketConnected(true))
}, [])



useEffect(() => {
  
socket.on('recieveMessage',(message) =>{

if (!selectedChatCompare || message._id != selectedChatCompare._id) {
  // give notification
}else{
  setSelectedchat(message)
}
})


socket.on('typing',(room)=>{
  Room = room

  setistyping(true)


})
socket.on('stopTyping',(room)=>{

  Room = room
  setistyping(false)


})
}, )









  const messageStyle = {
    display: "flex",
    flexDirection:'column',
    overflowY:'scroll',
    scrollbars:'none',
    padding:'10px',
    height:'600px'
  }

  const getSender = (loginuser,chat) =>{
    return loginuser._id === chat.POne._id? chat.PTwo :chat.POne
  }
  



  const messageBoxStyle = {
    overflowY:"hidden",
    height:'100%',
    width:'100%',
    backgroundColor:'#E8E8E8',
    borderRadius:'5px',
 
  }

  // handle typing message
  const typinghandler =(e) =>{
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    socket.emit('typing',selectedchat._id)

    let lastTyingTime = new Date().getTime();
    let timerLength = 2000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow-lastTyingTime;
      if (timeDiff >= timerLength ) {
      
        socket.emit('stopTyping',selectedchat._id);
    
      }
    }, timerLength);
   
  }

  // handle send message
  const handleSendMessage = (e) =>{
    e.preventDefault();
    if (!newMessage) {
      return toast.error('please type message')
    }
    sendMessage({messageText:newMessage,chatId:selectedchat});
    // settyping(false)
    setNewMessage('')
    getAllChats()

  }
  return (
    <>
    {
        selectedchat?(
            <>
            {/* chat header */}
            <Box
            sx={{p:'0'}}
            fontSize={{xs:'28px',md:'30px'}}
            pb={3}
            px={2}
            width='100%'
            fontFamily='work sans'
            display='flex'
            justifyContent={{xs:'space-between'}}
            alignItems='center'
            >
               <Box sx={{cursor:'pointer'}} 
                display={{xs:'flex',md:'none'}}
                onClick={()=>setSelectedchat(null)}>
               <ArrowBackIos  />
               </Box>
             <Box>
             {
                    !selectedchat?.isGroupChat? (
                        <Typography variant='h5' sx={{mr:1,display:'flex',alignItems:'center'}}>
                            <Avatar
                                alt="Remy Sharp"
                                src={getSender(loginuser,selectedchat).pic}
                                sx={{mx:'3px' }}
                             />
                        {
                            getSender(loginuser,selectedchat).name
                        }
                        </Typography>
                    ):(
                        <Typography variant='h5' sx={{mr:1}}>
                        {selectedchat.chatName.toUpperCase()} 
                        </Typography>
                    )
               }
             </Box>
             

             {
                !selectedchat.isGroupChat?<>
                          <Box 
             onClick={()=>setopenmodal(true)}
             borderRadius={3}
             sx={{
                mr:'15px' ,
                p:'10px',
                cursor:'pointer',
                "&:hover": {
                    backgroundColor: "#38B2Ac",
                    color: "#fff",
                  },
                  transition:'all 0.5s'
                }}>
            
                <Visibility/>
             </Box>
             <ProfileModal user={getSender(loginuser,selectedchat)} open={openmodal} setopenmodal={setopenmodal}/>
                </> :<>
                <UpdateGroupChatModal selectedchate={selectedchat} />
                </>
             }
   
              
            
            </Box >
            {/* chat message */}

             <Box display='flex' flexDirection='column' sx={messageBoxStyle}>
             <Box sx={messageStyle} flexGrow={1} >

              <ScrollableChat selectedchat={selectedchat}/>
             </Box>
            {istyping && Room == selectedchat?._id? <p>loading</p>:""}
             <Box display='flex' component='form' onSubmit={handleSendMessage}>
             
             <TextField onChange={typinghandler} value={newMessage} fullWidth size="small" placeholder='type your message......'  variant="outlined" />
             <Button type='submit'  variant='contained'>send</Button>
             </Box>

             </Box>

            </>
        ):(
            <Box sx={{display:'flex',justifyContent:'center', alignItems:'center', height:'100%' }} >

                <Typography sx={{fontWeight:'bold'}}>Click on a user to start chatting</Typography>
            </Box>
        )
    }
    
    </>
  )
}

export default SingleChat
