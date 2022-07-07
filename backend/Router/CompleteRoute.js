const express = require('express')
const Complete = require('../Model/Complete')

const CompleteRouter = express.Router()

CompleteRouter.get('/complete', (req,res)=>{
    Complete.find({}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

module.exports = CompleteRouter