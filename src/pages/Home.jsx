import { Box, Container, Typography,Tabs ,Tab, TextField} from '@mui/material'
import React, { useState }  from'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Login, Logout } from '@mui/icons-material';

import LoginComponent from './../components/Authentication/Login';
import SignUp from '../components/Authentication/SignUp';


const Home = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{my:'1rem'}} >
        <Box >

        <Typography width={{xs:"100%",sm:"50%"}} variant="h4" sx={{margin:"auto",bgcolor:"#fff",borderRadius:"5px",paddingY:"5px",textAlign:'center'}}  >
        
        Talk-A-Tive
      </Typography>
        </Box>

        <Box width={{xs:"100%",sm:"50%"}} variant="h4" sx={{margin:"auto", mt:"5px",bgcolor:"#fff",borderRadius:"5px",paddingY:"5px",textAlign:'center'}}  >

        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider',display:'flex' }}>
          <TabList sx={{width:"100%"}} onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={{width:'50%'}} label="Login" value="1" />
            <Tab sx={{width:'50%'}}   label="Register" value="2" />
        
          </TabList>
        </Box>
        <TabPanel value="1">
        <LoginComponent/>
       
        </TabPanel>
        <TabPanel value="2">
          <SignUp/>
        </TabPanel>
   
      </TabContext>



    
    </Box>


    </Container>
  )
}

export default Home