import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Visibility, Search } from '@mui/icons-material';
import { chatcontext } from './../../context/ChatContext';
import { Chip, Input } from '@mui/material';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import UserListItem from './UserListItem';
import { UserContext } from '../../context/UserContext';

const UpdateGroupChatModal = ({selectedchate}) => {
  const {UpdateChatName,getAllChats,addUserToGroup,removeUserFromGroup,selectedchat,getchatData}=useContext(chatcontext)
  const {searchResult,searchUsers}=useContext(UserContext)
    const [open, setOpen] = React.useState(false);
    const [chatName, setchatName] = useState("");
    const [Search, setSearch] = useState('')
    const [chatnameLoading, setchatnameLoading] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);










    const handleClick = () => {
      console.info('You clicked the Chip.');
    };
  
    const handleDelete =async (userId) => {
      await removeUserFromGroup(selectedchat._id,userId);
     
   
    };
    

    // handle update group name
const handleSubmitName =async (e) =>{
  e.preventDefault()

  if (chatName.trim() === "")return toast.error('please enter new chat name');
  setchatnameLoading(true)
await UpdateChatName(selectedchat._id,{chatName});
setchatName('')
setchatnameLoading(false)
getAllChats()

}


// on search
const handleSearch =async(e) =>{
  setSearch(e.target.value)
 await searchUsers(Search)

}


//handle add user 
const handleAddUser =async(userId) =>{
 for (const user of selectedchat.groupUsers) {
   if (user._id === userId) {
     return toast.error('user Already added')
   }
 }
await  addUserToGroup(selectedchat._id,userId)
}
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '3px solid #29A66C',
        boxShadow: 24,
        borderRadius:'10px',
        p: 4,
      };
      
  return (
    <div>
      <Box
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
         }}
      >

        <Visibility sx={{cursor:'pointer'}} onClick={handleOpen}/> 
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
          sx={{textAlign:"center"}}
          id="modal-modal-title" variant="h6" component="h2">
           {selectedchat?.chatName.toUpperCase()}
          </Typography>
          <Box sx={{ mt: 2,display:'flex',flexWrap:'wrap',gap:1 }}>
            {
              selectedchat?.groupUsers?.map((u,i) =>{
                return (
                  <Chip
                  key={i}
                  label={u.name}
                  onClick={handleClick}
                  onDelete={()=>handleDelete(u._id)}
                  color="success"
                  size="small"
                />
                )
              })
            }
         

   
          </Box>
          <Box component='form' onSubmit={handleSubmitName} display='flex' justifyContent='space-between' alignItems='center' my={2}>
          <Input placeholder="chat name" onChange={(e)=>setchatName(e.target.value)} value={chatName} />
          <LoadingButton loading={chatnameLoading} type='submit' variant='contained' color="success">Update</LoadingButton>
          </Box>
          <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>
          <Input placeholder="add user to group" onChange={(e)=>handleSearch(e)}  />
       
          </Box>
          <Box>
            {
              searchResult?searchResult.map((user,i)=>{
                return (
                  <UserListItem key={i} handleFunction={()=>handleAddUser(user._id)} user={user} />  
                )
              }):""
            }
       
          </Box>
          <Button sx={{width:'100%'}} variant="outlined" color="error" >Leave Group</Button>


        </Box>
      </Modal>
    </div>
  )
}

export default UpdateGroupChatModal
