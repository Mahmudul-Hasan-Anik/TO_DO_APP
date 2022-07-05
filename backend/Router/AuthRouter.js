const express = require('express')
const bcrypt = require('bcrypt');
const User = require('../Model/UserModel');

const AuthRoute = express.Router()

AuthRoute.post('/registration', async(req,res)=>{
    const newAuth = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })

    await newAuth.save().then(()=>{
        res.status(200).send(newAuth)
    }).catch((e)=>{
        res.status(400).json({msg:'Registration Failed'})
    })
})

module.exports = AuthRoute
