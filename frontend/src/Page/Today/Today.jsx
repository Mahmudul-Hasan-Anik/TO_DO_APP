import React,{ useState,useEffect } from 'react'
import Layout from '../../Components/Layout'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import { FormControl, Select,TextField ,Modal, Box, InputLabel,Button, CardContent, Chip, Card,IconButton,Typography, Checkbox} from '@mui/material';


// MODEL CSS STYLE
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  color: 'black',
  p: 4,
};

const Today = () => {
    const [task, setTask] = useState('')
    const [priority, setPriority] = useState('')
    const [taskID, setTaskID] = useState('')

    const [taskValue, setTaskValue] = useState([])

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);


    const handleSubmit = async(e)=>{
      e.preventDefault()

      await axios.post('http://localhost:5000/task/api/today', {
        task : task,
        priority: priority,
      }).then(()=>{
         setTask('')
         setPriority('')
      })
    }

    const handleDelete = async(id)=>{
      await axios.post(`http://localhost:5000/task/api/today/delete/${id}`)
    }

    const handleEdit = async(id)=>{
      setOpen(true)
        const {data} = await axios.get(`http://localhost:5000/task/api/today/edit/${id}`)
        setTask(data.task)
        setPriority(data.priority)
        setTaskID(data._id)

        console.log(data)
    }

    const handleEditSubmit = ()=>{

      axios.put('http://localhost:5000/task/api/today/edit',{
        id: taskID,
        task : task,
        priority: priority,
      }).then(()=>{
        setOpen(false)
      })
    }

    useEffect(()=>{
      async function fatchData(){
        const {data} = await axios.get('http://localhost:5000/task/api/today')
        setTaskValue(data)
      }
      fatchData()
    },[])

  return (
    <Layout title='To-do'>
      <div className='main_content'>
        <div className='today_main'>
          <h2>Write Your Today's Plan</h2>
          <Box
              sx={{
                alignItems: 'center',
                '& > :not(style)': { m: 1 },
              }}
          >
          <TextField label="Name" sx={{ m: 1, minWidth: 380 }} onChange={(e)=>setTask(e.target.value)} value={task}/>

          <FormControl sx={{ m: 1, minWidth: 380 }} onChange={(e)=>setPriority(e.target.value)} >
              <InputLabel >Set Priority</InputLabel>
              <Select native label="Set Priority" value={priority}>
                  <option >Set Priority</option>
                  <option value='Argent'>Argent</option>
                  <option value='Important'>Important</option>
                  <option value='Not Argent'>Not Argent</option>
              </Select>
            </FormControl>
            <Button variant="contained" size='large' onClick={handleSubmit}>Submit</Button>
          </Box>
        </div>

      <h2 style={{marginLeft:'10px'}}>Your Task</h2>
      {taskValue.map((items)=>(

      <Card sx={{ display: 'flex', width: 1000, m:2 }} key={items._id}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 100 }}>
        <CardContent >
          <Typography  variant="p">
            <Checkbox />
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 400 }}>
        <CardContent >
          <Typography  variant="p">
           {items.task}
          </Typography>
        </CardContent>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', width: 350 }}>
        <CardContent >
          <Typography  variant="p">
            <Chip label={items.priority} variant="outlined"></Chip>
          </Typography>
        </CardContent>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column',width: 150 }}>
        <CardContent>
            <IconButton onClick={()=>handleEdit(items._id)}><EditIcon/></IconButton>
            <IconButton onClick={()=>handleDelete(items._id)}><DeleteIcon/></IconButton>
        </CardContent>
      </Box>
    
    </Card>
      ))}

      {/* MODEL SHOW AFTER CLICK EDIT BUTTON */}

        <div>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <TextField label="Name" sx={{ m: 1, minWidth: 380 }} onChange={(e)=>setTask(e.target.value)} value={task}/>

              <FormControl sx={{ m: 1, minWidth: 380 }} onChange={(e)=>setPriority(e.target.value)} >
                  <InputLabel >Set Priority</InputLabel>
                  <Select native label="Set Priority" value={priority}>
                      <option >Set Priority</option>
                      <option value='Argent'>Argent</option>
                      <option value='Important'>Important</option>
                      <option value='Not Argent'>Not Argent</option>
                  </Select>
                </FormControl>
                <Button variant="contained" size='large' onClick={handleEditSubmit} style={{marginLeft:'10px'}}>Submit</Button>
            </Box>
          </Modal>
        </div>
      </div>
    </Layout>
  )
}

export default Today
