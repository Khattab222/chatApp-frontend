import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Label } from '@mui/icons-material';
import { UserContext } from '../../context/UserContext';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate()
  const {signup} = useContext(UserContext)
    const [showPassword, setShowPassword] = React.useState(false);
    const [showCPassword, setShowCPassword] = React.useState(false);
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [repassword, setrepassword] = useState('')
    const [file, setfile] = useState(null)
    const [loading, setloading] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowCPassword = () => setShowCPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };



      //handle submit
      const handleSubmit =async (e) =>{
        e.preventDefault();
        if (password != repassword) {
          return toast.error("password and confirm  not matched")
        }
        if (!name) {
          return toast.error("name required")
        }
        if (!email) {
          return toast.error("name required")
        }
        if (!password) {
          return toast.error("name required")
        }
        if (!file) {
          return toast.error("name required")
        }
        setloading(true)
        let form = new FormData()
        form.append('name',name.trim())
        form.append('email',email.trim())
        form.append('password',password.trim())
        form.append('pic',file)


      await  signup(form)
        setloading(false);
        setname('')
        setemail('')
        setpassword('')
        setrepassword('')
        setfile('')

      }
  return (
    <Stack  spacing={2} component="form" onSubmit={handleSubmit} >
    <TextField
    onChange={(e)=>setname(e.target.value)}
    sx={{width:'100%'}}
   value={name}
    label="Name"
    type="text"
    autoComplete="current-password"
  />
    <TextField
    sx={{width:'100%'}}
    value={email}
    label="Email"
    type="email"
    autoComplete="current-password"
    onChange={(e)=>setemail(e.target.value)}

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
    <FormControl  variant="outlined">
    <InputLabel htmlFor="outlined-repeat-password">Confirm Password</InputLabel>
    <OutlinedInput
      id="outlined-repeat-password"
      type={showCPassword ? 'text' : 'password'}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowCPassword}
            edge="end"
          >
            {showCPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
      label="Confirm Password"
      value={repassword}
      onChange={(e)=>setrepassword(e.target.value)}

    />
  </FormControl>
 

  <InputLabel sx={{textAlign:'start',fontWeight:'800'}} htmlFor='ss' >upload photo</InputLabel>
  <Input id='ss'  type='file' onChange={(e)=> setfile(e.target.files[0])}/>
 
  <LoadingButton  type='submit' loading={loading} variant="contained" size="medium">Register</LoadingButton>
    </Stack>
  )
}

export default SignUp
