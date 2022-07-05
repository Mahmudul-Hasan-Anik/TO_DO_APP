import React,{useState} from 'react'
import { Box } from '@mui/system';
import { Button, Container, Grid, TextField } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState({
      email: '',
      password: '',
    })
    const handleChange = (e)=>{
      e.preventDefault()
      setValues({...values, [e.target.name]: e.target.value})
    }

    const {email,password} = values

    const handleSubmit = async()=>{

      if(!email || !password ){
        toast.error('Please fill all input box')
      }else if(!email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)){
        toast.error('Please enter a valid email')
      }else if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)){
        toast.error('Password must be 7 to 15 characters and have to one number and one special character')
      }else{
        try{
          toast.success('Login successful')
          await axios.post('http://localhost:5000/auth/api/login' , {
            email: email,
            password: password
          }).then(()=>{
            navigate('/')
            
            setValues({
              email: '',
              password: '',
            })
          })
        }catch(e){
          toast.error('Login Failed')
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
                <p>Login Your Account For Procced</p>
              <div>
                <TextField name='email' label="Email" type='email' variant="outlined"  onChange={handleChange} value={email}/>
                <TextField name='password' label="Password" type='password' variant="outlined"  onChange={handleChange} value={password}/>
              </div>
                <Button type='submit' variant="contained" size="large" onClick={handleSubmit}>Login</Button>
                <p>Create an account? <Link to='/registration'>Registration</Link></p>
            </Grid>
          </Grid>
         </div>
      </Box>
      </Container>
    </div>
  )
}

export default Login

