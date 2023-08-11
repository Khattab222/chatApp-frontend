import { Avatar, Box, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import { chatcontext } from '../../context/ChatContext';
import { ArrowBackIos, Visibility } from '@mui/icons-material';
import { UserContext } from '../../context/UserContext';
import ProfileModal from '../Authentication/ProfileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';

const SingleChat = () => {
  const {selectedchat,getAllChats,allChats,setSelectedchat}= useContext(chatcontext);
  const {loginuser}= useContext(UserContext)
  const [openmodal, setopenmodal] = useState(false);


  const getSender = (loginuser,chat) =>{
    return loginuser._id === chat.POne._id? chat.PTwo :chat.POne
  }
  
  console.log(selectedchat);
  const messageBoxStyle = {
    overflowY:"hidden",
    height:'100%',
    width:'100%',
    backgroundColor:'#E8E8E8',
    borderRadius:'5px'
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
                    !selectedchat.isGroupChat? (
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
                <UpdateGroupChatModal/>
                </>
             }
   
              
            
            </Box>
            {/* chat message */}

             <Box sx={messageBoxStyle}>

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
