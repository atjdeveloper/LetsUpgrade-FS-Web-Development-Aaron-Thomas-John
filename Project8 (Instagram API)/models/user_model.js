const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:8},
    email:{type:String,required:true,unique:true},
    picture:{type:String,default:'https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png'},
    private:{type:Boolean,required:true,default:false},
    bio:String,
},
{
    timestamps:true
})

const userModel = new mongoose.model('users',userSchema);


module.exports = userModel;