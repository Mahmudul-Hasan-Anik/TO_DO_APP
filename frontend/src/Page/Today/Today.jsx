import React,{ useState,useEffect } from 'react'
import Layout from '../../Components/Layout'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { FormControl, Select,TextField ,Modal, Box, InputLabel,Button,Tooltip, CardContent, Chip, Card,IconButton,Typography, Checkbox} from '@mui/material';
import { useContext } from 'react';
import { Store } from '../../Store';


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
    const [check, setCheck] = useState(false)
    const [taskValue, setTaskValue] = useState([])

    const {state} = useContext(Store)
    const {user} = state

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);


    const handleSubmit = async(e)=>{
      e.preventDefault()

      await axios.post('http://localhost:5000/task/api/today', {
        task : task,
        priority: priority,
        user: user
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
    }

    const handleEditSubmit = ()=>{

      axios.put('http://localhost:5000/task/api/today/edit',{
        id: taskID,
        task : task,
        user: user,
        priority: priority,
      }).then(()=>{
        setOpen(false)
      })
    }

    const handleChack = (item)=>{
      if(check !== true){
          axios.post(`http://localhost:5000/task/api/today/complete/${item._id}`,{
            task : item.task,
            priority: item.priority,
            user: user,
            time: Date()
          })
        // toast.success('Task Complete')
      }
    }

    useEffect(()=>{
      async function fatchData(){
        const {data} = await axios.get(`http://localhost:5000/task/api/today/user/${user._id}`)
        setTaskValue(data)
      }
      fatchData()
    },[taskValue])


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

{/* SHOW DATA */}
      <h2 style={{marginLeft:'10px'}}>Your Task</h2>
      {taskValue.map((items)=>(

      <Card sx={{ display: 'flex', width: 1000, m:2 }} key={items._id}>
      <Box sx={{ width: 100 }} className='card_design'>
        <CardContent >
          <Typography  variant="p">
            <Tooltip title="Complete"><Checkbox onClick={()=>handleChack(items)} onChange={(e)=>setCheck(e.target.checked)}/></Tooltip>
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ width: 400 }} className='card_design'>
        <CardContent >
          <Typography  variant="p">
           {items.task}
          </Typography>
        </CardContent>
      </Box>

      <Box sx={{ width: 350 }} className='card_design'>
        <CardContent >
          <Typography  variant="p">
            <Chip label={items.priority} variant="outlined"></Chip>
          </Typography>
        </CardContent>
      </Box>

      <Box sx={{ width: 150 }} className='card_design'>
        <CardContent>
            <Tooltip title="Edit"><IconButton onClick={()=>handleEdit(items._id)}><EditIcon/></IconButton></Tooltip>
            <Tooltip title="Clear"><IconButton onClick={()=>handleDelete(items._id)}><DeleteIcon/></IconButton></Tooltip>
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
