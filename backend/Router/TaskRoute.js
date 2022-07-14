const express = require('express')
const Complete = require('../Model/Complete')
const TodayTask = require('../Model/TodayModel')

const TaskRouter = express.Router()

// TASK DATA POST 
TaskRouter.post('/today', async(req,res)=>{
    const newTask = new TodayTask({
        task: req.body.task,
        priority: req.body.priority,
        user: req.body.user
    })

    await newTask.save().then(()=>{
        res.status(200).json({msg: 'Task Addition Successful'})
    }).catch((e)=>{
        res.status(400).json({msg: 'Task Addition Failed'})
    })
})

// TASK DATA SHOW 
TaskRouter.get('/today/user/:id', (req,res)=>{
    TodayTask.find({user: req.params.id}, (err,docs)=>{
        if(docs){
            res.send(docs)
            console.log(docs)
        }else{
            res.send(err)
        }
    })

})

//INDIVISUL TASK DATA SHOW
TaskRouter.get('/today/edit/:id', (req,res)=>{
    TodayTask.findById({_id:req.params.id}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

// TASK DATA DELETE 
TaskRouter.post('/today/delete/:id', (req,res)=>{
    TodayTask.findByIdAndDelete({_id: req.params.id}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

// TASK DATA UPDATE
TaskRouter.put('/today/edit', (req,res)=>{
    const update = {
        task: req.body.task,
        priority: req.body.priority, 
    }

    TodayTask.findByIdAndUpdate(req.body.id, update, {new: true}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(400).json(err)
        }
    })
})

// TASK DELETE AND SENT COMPLETE PAGE DATABASE
TaskRouter.post('/today/complete/:id', (req,res)=>{
    const newComplete = new Complete({
        task: req.body.task,
        priority: req.body.priority, 
        user: req.body.user,
        time: req.body.time
    })

    newComplete.save()

    TodayTask.findByIdAndDelete({_id: req.params.id}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

module.exports = TaskRouter