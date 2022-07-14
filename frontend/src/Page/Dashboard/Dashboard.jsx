import React, { useContext, useEffect } from 'react'
import Layout from '../../Components/Layout';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Store } from '../../Store';
import { useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontWeight: 'bold'
}));

const Dashboard = () => {
  const {state} = useContext(Store)
  const {user} = state

  const [active, setActive] = useState('')
  const [complete, setComplete] = useState('')

  useEffect(()=>{
    async function fatchData(){
      const {data} = await axios.get(`http://localhost:5000/task/api/today/user/${user._id}`)
      setActive(data.length)
    }
    fatchData()
  },[active, complete])

  useEffect(()=>{
    async function fatchData(){
      const {data} = await axios.get(`http://localhost:5000/all/api/complete/${user._id}`)
      setComplete(data.length)
    }
    fatchData()
  },[active, complete])

  return (
    <Layout title='Home'>
      <div className='main_content'>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={2} sm={4} md={4} className="test">
                <Item>Active Task</Item>
                <Item>
                  <h2>{active}</h2>
                </Item>
              </Grid>
              <Grid item xs={2} sm={4} md={4} >
                <Item>Complete Task</Item>
                <Item>
                  <h2>{complete}</h2>
                </Item>
              </Grid>
              <Grid item xs={2} sm={4} md={4} >
                <Item>Total Task</Item>
                <Item>
                  <h2>{active + complete}</h2>
                </Item>
              </Grid>
          </Grid>
        </Box>
      </div>
    </Layout>
  )
}

export default Dashboard



