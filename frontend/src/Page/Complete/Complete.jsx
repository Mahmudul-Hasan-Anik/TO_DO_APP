import React, { useEffect,useState,useContext } from 'react'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete'
import moment from 'moment';
import Layout from '../../Components/Layout'
import {  Box, CardContent, Chip, Card,IconButton,Typography,Tooltip} from '@mui/material';
import { Store } from '../../Store';


const Complete = () => {
  const [complete, setComplete] = useState([])
  const {state} = useContext(Store)
  const {user} = state

  const handleDelete = (id)=>{
    axios.post(`http://localhost:5000/all/api/complete/delete/${id}`)
  }

  useEffect(()=>{
    async function fatchData(){
      const {data} = await axios.get(`http://localhost:5000/all/api/complete/${user._id}`)
      setComplete(data)
    }
    fatchData()
  },[complete])
  return (
    <Layout title='Complete'>

      <div className='main_content'>
      <h2 style={{marginLeft:'10px'}}>Your Completed Tasks</h2>
      {complete.map((items, index)=>(
      <Card sx={{ display: 'flex', width: 1000, m:2 }} key={items._id}>
          <Box sx={{  width: 100, marginTop:'10px' }} className='card_design'>
            <CardContent >
              <Typography  variant="p">
                {index + 1}
              </Typography>
            </CardContent>
          </Box>
          <Box sx={{ width: 400, marginTop:'10px'}} className='card_design'>
            <CardContent >
              <Typography  variant="p">
                {items.task}
              </Typography>
            </CardContent>
          </Box>

          <Box sx={{ width: 300, marginTop:'5px' }} className='card_design'>
            <CardContent >
              <Typography  variant="p">
                <Chip label={items.priority} variant="outlined"></Chip>
              </Typography>
            </CardContent>
          </Box>
          <Box sx={{ width: 300, marginTop:'5px' }} className='card_design'>
            <CardContent >
              <Typography  variant="p">
                {moment(items.time).format('lll')}
              </Typography>
            </CardContent>
          </Box>

          <Box sx={{ width: 150 }} className='card_design'>
            <CardContent>
                <Tooltip title="Clear"><IconButton onClick={()=>handleDelete(items._id)}><DeleteIcon/></IconButton></Tooltip>
            </CardContent>
          </Box>
        </Card>
      ))}
      </div>
    </Layout>
  )
}

export default Complete