const mongoose = require('mongoose')

const TodayTaskSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true
    },
    priority:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps: true
})

const TodayTask = mongoose.model('TodayTask', TodayTaskSchema)
module.exports = TodayTask