const mongoose= require('mongoose');


const userVideoSchema = new mongoose.Schema({

    user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    video:{type:mongoose.Schema.Types.ObjectId,ref:"videos"},
    currentTime:{type:Number,required:true,default:0},
    status:{type:String,enum:["watching","ended"],default:"watching"}
},{timestamps:true})

const userVideoModel = new mongoose.model("users_videos",userVideoSchema);

module.exports = userVideoModel;