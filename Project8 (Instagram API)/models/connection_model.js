const mongoose = require('mongoose');


const connectionSchema = new mongoose.Schema({
    follower_id:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    followed_id:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    status:{type:Number,required:true,default:0}
})

const connectionModel = new mongoose.model('connections',connectionSchema);

module.exports = connectionModel;