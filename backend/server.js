const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors');
const mongoose = require('mongoose');

const AuthRoute = require('./Router/AuthRouter');
const TaskRouter = require('./Router/TaskRoute');

dotenv.config()
mongoose.connect(process.env.DATABASE_URL, ()=>{
    console.log('Database Connected')
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use('/auth/api', AuthRoute)
app.use('/task/api', TaskRouter)

app.get('/', function (req, res) {
  res.send('Hello World')
})

const port = process.env.SERVER || 8000

app.listen(port, ()=>{
    console.log(`Server Running Port ${port}`)
})