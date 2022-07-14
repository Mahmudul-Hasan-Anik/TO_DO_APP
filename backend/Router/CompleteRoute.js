const express = require('express')
const Complete = require('../Model/Complete')

const CompleteRouter = express.Router()

CompleteRouter.get('/complete/:id', (req,res)=>{
    Complete.find({user: req.params.id}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

CompleteRouter.post('/complete/delete/:id', (req, res)=>{
    Complete.findByIdAndDelete({_id: req.params.id}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

module.exports = CompleteRouter