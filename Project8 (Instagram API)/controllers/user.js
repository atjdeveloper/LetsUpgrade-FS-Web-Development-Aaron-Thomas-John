const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
// importing userModel 
const userModel = require('../models/user_model');
//importing verify token
const verifyToken = require('../verify_token');

const router = express.Router();

router.post('/register',verifyToken,(req,res)=>{
    let user = req.body;

    bcryptjs.genSalt(10,(err,salt)=>{
        bcryptjs.hash(user.password,salt,(err,enc_password)=>{
            if(err===null){
                user.password = enc_password;
                let userObj = new userModel(user);
                userObj.save()
                .then(()=>{
                    res.send({message:"User Created"});
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

router.post('/login',verifyToken,(req,res)=>{
    let userCred = req.body;
    userModel.findOne({username:userCred.username})
    .then((user)=>{
         if(user!==null){
             bcryptjs.compare(userCred.password,user.password,(err,login)=>{
                 if(login===true){
                    jwt.sign(userCred,"secretcode",(err,token)=>{
                        if(err===null){
                            res.send({token:token});
                        }
                    })
                 }else{
                     res.send({message:"Password incorrect"});
                 }
             })
         }else{
             res.send({message:"Incorrect username"})
         }
        
    })
    .catch((err)=>{
        res.send({message:"Some problem in logging in"});
        console.log(err);
    })
})

router.get('/forgetpassword/:email',(req,res)=>{
    let email = req.params.email;
    let transport = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user:"johnthomas0282@gmail.com",
            pass:"john@2021",
        }
    })

    let mailData ={
        from:"johnthomas0282@gmail.com",
        to:email,
        subject:"Password Reset",
        text:"Test for email",
        html:`<div style="height:100%;width:100%;background-color:lightgray;color:white;text-align:center;font-size:60px;">

        RESET LINK Please click here bye bye
        </div>`
    }

    transport.sendMail(mailData,(error,info) => {
        if(error!=null) {
            console.log(error);
            res.send({message:"problem while sending email"});
        }
        else{
            res.send({message:"Reset link sent successfully"});
        }
    })
})

module.exports = router;