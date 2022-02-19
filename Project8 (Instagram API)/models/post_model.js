const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption:String,
    content:{type:String,required:true},
    type:{type:String,enum:["post","story"]},
    location:String,
    tags:[{type:String}],
    user:{type:mongoose.Schema.Types.ObjectId,ref:"users"}
},{timestamps:true});

const postModel = new mongoose.model('posts', postSchema);

module.exports = postModel;
