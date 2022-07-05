import React,{useState} from 'react'
import { Box } from '@mui/system';
import { Button, Container, Grid, TextField } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

const Registration = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState({
      name: '',
      email: '',
      password: '',
      conformPassword: ''
    })
    const handleChange = (e)=>{
      e.preventDefault()
      setValues({...values, [e.target.name]: e.target.value})
    }

    const {name,email,password,conformPassword} = values

    const handleSubmit = async()=>{

      if(!name || !email || !password || !conformPassword){
        toast.error('Please fill all input box')
      }else if(!name.match(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/)){
        toast.error(`First Letter must be uppercase`)
      }else if(!email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)){
        toast.error('Please enter a valid email')
      }else if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)){
        toast.error('Password must be 7 to 15 characters and have to one number and one special character')
      }else if(password !== conformPassword){
        toast.error('Password not matched')
      }else{
        try{
          toast.success('Registration successful')
          await axios.post('http://localhost:5000/auth/api/registration' , {
            name: name,
            email: email,
            password: password
          }).then(()=>{
            navigate('/login')
            
            setValues({
              name: '',
              email: '',
              password: '',
              conformPassword: ''
            })
          })
        }catch(e){
          toast.error('Registration Failed')
        }
      }
    }
    
  return (
   
    <div className='Auth_main'>
      <Container>
      <Box>
         <div className='Auth_col'>
         <Grid container spacing={2}>
            <Grid item xs={6}  className='Auth_col-one'>
              <img src='../image/three.jpg'/>
            </Grid>
            
            <Grid item xs={6} className='Auth_input'>
                <h2>Welcome To <span style={{color:'red'}}>Planner</span></h2>
                <p>A Daily Planning Web App</p>
              <div>
                <TextField name='name' label="Name" type='text' variant="outlined"  onChange={handleChange} value={name}/>
                <TextField name='email' label="Email" type='email' variant="outlined"  onChange={handleChange} value={email}/>
                <TextField name='password' label="Password" type='password' variant="outlined"  onChange={handleChange} value={password}/>
                <TextField name='conformPassword' label="Conform Password" type='password' variant="outlined" onChange={handleChange} value={conformPassword}/>
              </div>
                <Button type='submit' variant="contained" size="large" onClick={handleSubmit}>Registration</Button>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </Grid>
          </Grid>
         </div>
      </Box>
      </Container>
    </div>
  )
}

export default Registration

