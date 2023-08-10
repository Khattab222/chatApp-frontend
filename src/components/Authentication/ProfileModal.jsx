import { Box, Modal, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext';

const ProfileModal = ({open,setopenmodal}) => {
  const {loginuser} = useContext(UserContext)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        border: '3px solid #000',
        borderRadius:'10px',
        boxShadow: 30,
        p: 4,
      };
      const handleClose = () => setopenmodal(false);
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
          <Typography sx={{textAlign:'center'}} id="modal-modal-title" variant="h4" component="h2">
            {loginuser.name}
          </Typography>
          <div>
            <img style={{width:'100%',borderRadius:'5px'}} src={loginuser.pic} alt="" />
          </div>
          <Typography  id="modal-modal-description" sx={{ mt: 2,textAlign:'center',fontWeight:'bold' }}>
            {loginuser.email}
          </Typography>
        </Box>

    </Modal>
  )
}

export default ProfileModal
