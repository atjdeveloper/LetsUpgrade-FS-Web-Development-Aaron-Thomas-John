const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    message:{type:String, required:true},
    user_s:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    user_r:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
})

const chatModel = new mongoose.model('chat', chatSchema);


module.exports = chatModel;