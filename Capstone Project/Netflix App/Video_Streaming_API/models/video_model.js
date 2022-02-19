const mongoose = require('mongoose');


const videoSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    runtime:{type:Number,required:true}, 
    cast:[{type:String,required:true}],
    releaseYear:{type:Number,required:true},  
    rating:{type:Number,required:true},
    genre:{type:String,required:true},  
    filepath:{type:String,required:true},
    thumbnail:{type:String,required:true}
},{timestamps:true})


const videoModel = new mongoose.model("videos",videoSchema);


module.exports=videoModel;