import { Notifications, Search } from '@mui/icons-material'
import { AppBar, Avatar, Badge, Box, Button, Divider, Drawer, IconButton, Input, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import ProfileModal from '../Authentication/ProfileModal'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import BaseUrl from '../../context/Api'
import ChatLoading from '../chat/ChatLoading'
import UserListItem from '../chat/UserListItem'
import { chatcontext } from '../../context/ChatContext'

const SideDrawer = () => {
  const {loginuser} = useContext(UserContext);
  const {accessChat,setNotification,notification} = useContext(chatcontext)
  const [anchorEl, setAnchorEl] =useState(null);
  const [anchorElNotification, setAnchorElNotification] =useState(null);
  const [openmodal, setopenmodal] = useState(false);
  const [showdrawer, setshowdrawer] = useState(false)
  const [searchResult, setSearchResult] = useState([])
const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const getSender = (loginuser,chat) =>{
    return loginuser._id === chat.POne._id? chat.PTwo :chat.POne
  }
  const inputElement = useRef()


  const open = Boolean(anchorEl);
  const notificationopen = Boolean(anchorElNotification);
  const handleClick =(e) =>{
    setAnchorEl(e.target)
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
 

  // logOut function
  const logOut = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('loginUser');

    navigate('/')

  }



  // handle search
  const handleSearch =async (e) =>{
    setLoading(true)
  const search = e.target.value;
  try {
    const config = {
      headers: {'authorization': `chat__${localStorage.getItem("token")}`}
    }
    const {data} = await BaseUrl.get(`/auth/search?search=${search}`,config);
  
    setSearchResult(data.users)
    setLoading(false)
  } catch (error) {
    toast.error(error.response.data.Error)
    setLoading(false)
  }

  }


// access chat to user
const handleAccessChat =async(userId)=>{

await accessChat(userId)
setshowdrawer(false)

}


// for notification
const openNotifactio = (e) =>{
  setAnchorElNotification(e.target)
}

const handleCloseNotification = () => {
  setAnchorElNotification(null);
};
  return (
    <div>
<AppBar color='primary' position='sticky'>
  <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
    <Tooltip title='search user to chat' >
    <Button onClick={()=>setshowdrawer(true)} variant='contained' color='success' startIcon={<Search />}>
Search User ...
    </Button>
    </Tooltip>
    <Typography variant='h4' component='h1'>Talk-A-Tive</Typography>
  <div>
  <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={openNotifactio}
            >
              <Badge badgeContent={17} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <Menu
   anchorEl={anchorElNotification}
   open={notificationopen}
   onClose={handleCloseNotification}

   >
    {!notification.length?<MenuItem sx={{mr:5}} >no Messages</MenuItem>:
    
    notification.map((noti) => (
      <MenuItem key={noti._id} sx={{mr:5}} >{noti.isGroupChat?`new message in ${noti.chatName} chat`:`new message from ${getSender(loginuser,noti).name}`}</MenuItem>
    ))
    }

        
   </Menu>
    
   <Button sx={{ml:'5px'}} >
   <Avatar  
   onClick={handleClick}
   alt={loginuser.name}
   src={loginuser.pic}></Avatar>
   </Button>
   <Menu
   anchorEl={anchorEl}
   open={open}
   onClose={handleClose}
   >
<MenuItem onClick={()=>setopenmodal(true)}>Profile</MenuItem>
 
        <Divider/>
        <MenuItem onClick={logOut}>Logout</MenuItem>
   </Menu>

  </div>
  </Toolbar>
  </AppBar> 
  <ProfileModal user={loginuser} open={openmodal} setopenmodal={setopenmodal}/>
  <Drawer 

  sx={{width:'240px' }}
   variant="temporary"
   anchor="left"
   onClose={()=>setshowdrawer(false)}
  open={showdrawer}
  >
    <Typography variant='h6' sx={{textAlign:'center' ,fontWeight:'600' }}>Search Users</Typography>
    <Box sx={{p:2,display:'flex'}} >

<Input ref={inputElement} onChange={(e)=>handleSearch(e)} placeholder="search by name or email" />

    </Box>
    <Box sx={{margin:'15px',fontWeight:'bold'}}>
   {
    loading?<ChatLoading/> :(
    
      searchResult?.map((user) =>{
        return(
          <UserListItem handleFunction={handleAccessChat}  user={user} key={user._id} />
        )
      })
    
   )
   }
    </Box>
  </Drawer>
    </div>
  )
}

export default SideDrawer
