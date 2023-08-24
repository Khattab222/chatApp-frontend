import { Box, Button, Typography,Stack  } from '@mui/material'
import React, { useContext } from 'react'
import { chatcontext } from '../../context/ChatContext'
import { Add, Palette } from '@mui/icons-material'
import { useEffect } from 'react'
import ChatLoading from './ChatLoading';
import { UserContext } from '../../context/UserContext'
import GroupChatModal from './GroupChatModal'




const MyChats = () => {
  const {selectedchat,getAllChats,allChats,setSelectedchat,getchatData}= useContext(chatcontext);
  const {loginuser} = useContext(UserContext)

// get all chat for user
  useEffect(() => {
    getAllChats()
   
 
  }, [])  
  useEffect(() => {
    getAllChats()

   
  }, [selectedchat])
  
const getSender = (loginuser,chat) =>{
  return loginuser._id === chat.POne._id? chat.PTwo.name :chat.POne.name
}


// select chat
const handleSelectChat =async (chat) =>{
  setSelectedchat(chat);
await  getchatData(chat._id)


}
  return (
    <Box
    sx={{borderRadius:'10px'}}
 display={{xs:selectedchat?'none':'flex',md:'flex'}}
 flexDirection='column'
 p={2}
 bgcolor='info.contrastText'
 width={{md:'31%',xs:'100%'}}
    
    >
      <Box sx={{display:'flex', justifyContent:'space-between',alignItems:'center' }}>
    <Typography>

      MyChats
    </Typography>
    <GroupChatModal>

    <Button variant="outlined" endIcon={<Add />}>
  New Group Chat
</Button>
    </GroupChatModal>
      </Box>

      <Box
      display='flex'
      flexDirection='column'
      my={2}
   
      width='100%'
      height='100%'
      overflowy='hidden'
      borderRadius='5px'
      >
        {
          allChats? (
            <Stack overflowy="scroll"  >
             { 
             allChats.map((chat,i) =>{
              return(
                <Box 
                sx={{cursor:'pointer'}}
                bgcolor={selectedchat?._id === chat._id?"#38B2AC" :"#E8E8E8"}
                color={selectedchat?._id === chat._id?"#fff" :"black"}
                key={i}
                borderRadius='5px'
                p={1}
                m={1}
                onClick={()=>handleSelectChat(chat)}
                >
                  <Typography>
                    {
                      !chat.isGroupChat?getSender(loginuser,chat):chat.chatName
                    }
                  </Typography>
                </Box>
              )
             })
             
             }
            </Stack>
          ):<ChatLoading/>
        }
   
      </Box>

    </Box>
  )
}

export default MyChats
