import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { UserContext } from '../../context/UserContext';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';


const LoginComponent = () => {
  const  navigate = useNavigate()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [loading, setloading] = useState(false)
    const [showPassword, setShowPassword] = React.useState(false);
    const {login} = useContext(UserContext)

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };



      const handleSubmit =async (e) =>{
        e.preventDefault()
        setloading(true)
      await  login({email,password})
      setpassword('')
      setemail('')
      setloading(false)
      navigate('/chat')
      }
  return (

      <Stack  spacing={2} component="form" onSubmit={handleSubmit} >
          <TextField
          sx={{width:'100%'}}
          value={email}
        onChange={(e)=>setemail(e.target.value)}
          label="Email"
          type="email"
         
        />
          <FormControl  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
          />
        </FormControl>
        <LoadingButton type='submit'  loading={loading} variant="contained" size="medium">Login</LoadingButton>
          </Stack>

  )
}

export default LoginComponent
