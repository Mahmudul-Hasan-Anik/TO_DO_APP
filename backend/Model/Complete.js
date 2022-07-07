const mongoose = require('mongoose')

const CompleteSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    priority:{
        type: String,
        required: true
    },
    time: {
        type: Date
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }
},
{
    timestamps: true
})

const Complete = mongoose.model('Complete', CompleteSchema)
module.exports = Complete