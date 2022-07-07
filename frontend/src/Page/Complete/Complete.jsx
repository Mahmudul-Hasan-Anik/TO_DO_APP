import React, { useEffect,useState } from 'react'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete'
import moment from 'moment';
import Layout from '../../Components/Layout'
import {  Box, CardContent, Chip, Card,IconButton,Typography,Tooltip} from '@mui/material';


const Complete = () => {
  const [complete, setComplete] = useState([])

  useEffect(()=>{
    async function fatchData(){
      const {data} = await axios.get('http://localhost:5000/all/api/complete')
      setComplete(data)
    }
    fatchData()
  },[])
  return (
    <Layout title='Complete'>

      <div className='main_content'>
      <h2 style={{marginLeft:'10px'}}>Your Completed Tasks</h2>
      {complete.map((items, index)=>(
      <Card sx={{ display: 'flex', width: 1000, m:2 }} key={items._id}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: 100, marginTop:'10px' }}>
            <CardContent >
              <Typography  variant="p">
                {index + 1}
              </Typography>
            </CardContent>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: 400, marginTop:'10px' }}>
            <CardContent >
              <Typography  variant="p">
                {items.task}
              </Typography>
            </CardContent>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', width: 300, marginTop:'5px' }}>
            <CardContent >
              <Typography  variant="p">
                <Chip label={items.priority} variant="outlined"></Chip>
              </Typography>
            </CardContent>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: 300, marginTop:'5px' }}>
            <CardContent >
              <Typography  variant="p">
                {moment(items.time).format('lll')}
              </Typography>
            </CardContent>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column',width: 150 }}>
            <CardContent>
                <Tooltip title="Clear"><IconButton><DeleteIcon/></IconButton></Tooltip>
            </CardContent>
          </Box>
        </Card>
      ))}
      </div>
    </Layout>
  )
}

export default Complete