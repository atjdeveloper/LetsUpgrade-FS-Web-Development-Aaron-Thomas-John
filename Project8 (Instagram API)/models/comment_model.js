const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment:{type:String,required:true},
    post_id:{type:mongoose.Schema.Types.ObjectId,ref:'posts'},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'users'},

})


const commentModel = new mongoose.model('comments',commentSchema);

module.exports = commentModel;