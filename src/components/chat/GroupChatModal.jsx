import { Box, Button, Chip, Input, Modal, Stack, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import UserListItem from './UserListItem';
import { toast } from 'react-toastify';
import { chatcontext } from '../../context/ChatContext';
import { LoadingButton } from '@mui/lab';


function GroupChatModal({children}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const {searchUsers,searchResult} = useContext(UserContext)
const {createGroup} = useContext(chatcontext)
  const [groupChatname, setGroupChatname] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [Search, setSearch] = useState('')
  const [loading, setloading] = useState(false);
  const [submitloading, setsubmitloading] = useState(false)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

  // handle search users 
  const handleSearchUser =async (e)=>{
    setSearch(e.target.value)
 
    setloading(true)
  await  searchUsers(Search)

  setloading(false)

  }



  // handle add user to group
  const handleGroup = (user) =>{

    if (selectedUsers.includes(user)) {
      toast.error('user already added');
      return;
    }
    setSelectedUsers([...selectedUsers,user])
  }


  // handle delete 
  const handleDelete = (user) => {
   const newUserArr = selectedUsers.filter((u) => u._id != user._id);
   setSelectedUsers(newUserArr)
  }


  // handle Submit
const  handleSubmit =async(e)=>{

e.preventDefault();
if (groupChatname.trim() === '') {
  return toast.error('chat name required')
}
const data = {
  chatName:groupChatname,
  groupUsers:selectedUsers.map((u)=>u._id)
}
setsubmitloading(true)
await createGroup(data)
setsubmitloading(false)


setSelectedUsers([]);
setSearch('')
setGroupChatname('')
  }



  return (
    <div>
   <span onClick={handleOpen}>{children}</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        component='form'
        onSubmit={handleSubmit}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" sx={{textAlign:'center'}} variant="h6" component="h2">
            Create Group Chat
          </Typography>
          <Box my={3}>

          <Input value={groupChatname} sx={{width:'100%',px:'3px'}} placeholder="chat name" onChange={(e)=>setGroupChatname(e.target.value)}  />
          </Box>
          <Box>

          <Input value={Search} onChange={(e)=>handleSearchUser(e)} sx={{width:'100%',px:'3px'}} placeholder="add users... search "  />

 <Stack direction="row" flexWrap='wrap' gap={1} spacing={1} my={1}>
     {
      selectedUsers?.map((u) => <Chip key={u._id} color="success" label={u.name} size="small"  onDelete={()=>handleDelete(u)} />)
     }
    
    
   
   </Stack>

          <Box textAlign='center' my={5}>{loading?"loading...":(
          searchResult?.slice(0,4).map((user,index)=> <UserListItem key={index} user={user} handleFunction={()=>handleGroup(user)}/> ) 
          )}</Box>
          </Box>
          <Box sx={{textAlign:'end',my:'5px'}}>

         <LoadingButton loading={submitloading}  type='submit'  color="primary" variant='contained' size ='small'>Create</LoadingButton>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default GroupChatModal
