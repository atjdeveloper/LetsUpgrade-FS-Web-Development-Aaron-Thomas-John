const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
// importing userModel 
const userModel = require('../models/user_model');
//importing verify token


const router = express.Router();

router.post('/register',(req,res)=>{
    let user = req.body;

    bcryptjs.genSalt(10,(err,salt)=>{
        bcryptjs.hash(user.password,salt,(err,enc_password)=>{
            if(err===null){
                user.password = enc_password;
                let userObj = new userModel(user);
                userObj.save()
                .then(()=>{
                    res.send({message:"User Created"})
                })
                .catch((err)=>{
                    res.send({message:"Not Registered"});
                    console.log(err);
                })
            }


        })
    })
})

//login user

router.post('/login',(req,res)=>{
    let userCred = req.body;
    userModel.findOne({username:userCred.username})
    .then((user)=>{
         if(user!==null){
             bcryptjs.compare(userCred.password,user.password,(err,login)=>{
                 if(login===true){
                    jwt.sign(userCred,"secretcode",(err,token)=>{
                        if(err===null){
                            res.send({success:true,token:token,username:user.username,user_id:user._id,name:user.name});
                        }
                    })
                 }else{
                     res.send({success:false,message:"Password incorrect"});
                 }
             })
         }else{
             res.send({success:false,message:"Incorrect username"})
         }
        
    })
    .catch((err)=>{
        res.send({success:false,message:"Some problem in logging in"});
        console.log(err);
    })
})


module.exports = router;