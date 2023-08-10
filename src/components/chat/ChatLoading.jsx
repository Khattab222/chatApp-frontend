import { Skeleton, Stack,Typography  } from '@mui/material'
import React from 'react'

const ChatLoading = () => {
  return (
    <Stack>
      <Typography  variant="h3">

      <Skeleton animation="wave" />
      </Typography>
      <Typography  variant="h3">

      <Skeleton animation="wave" />
      </Typography>
      <Typography  variant="h3">

      <Skeleton animation="wave" />
      </Typography>
      <Typography  variant="h3">

      <Skeleton animation="wave" />
      </Typography>
   
    </Stack>
  )
}

export default ChatLoading
