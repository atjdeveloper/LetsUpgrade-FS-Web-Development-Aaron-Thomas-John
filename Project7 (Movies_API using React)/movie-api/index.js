const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require("./models/user_model");
const productModel = require("./models/product_model");
const app = express();


//database connection
mongoose.connect("mongodb://localhost:27017/auth")
.then(()=>{
    console.log("Mongodb Connected");
})
.catch((err)=>{
    console.log(err);
})



//middleware
app.use(express.json());
app.use(cors());




app.post("/users",(req,res)=>{
    let user = req.body;
    bcryptjs.genSalt(10,(err,salt)=>{
        bcryptjs.hash(user.password,salt,(err,enc_password)=>{
             user.password = enc_password;
             let userObj = new userModel(user);
             userObj.save()
             .then(()=>{
                 res.send({message:"User Registered"});
             })
             .catch((err)=>{
                 console.log(err);
                 res.send({message:"Some error"})
             })
        })
    })
})

app.post("/users/login",(req,res)=>{
    let userCred = req.body;
    userModel.findOne({username:userCred.username})
    .then((user)=>{
        if(user!==null){
           bcryptjs.compare(userCred.password,user.password,(err,response)=>{
               if(response!=true){
                   res.send({message:"User found but password is incorrect"})
               }
               else{
                   jwt.sign(userCred,"authdemo",(err,token)=>{
                    res.send({message:"Auth successfull",token:token})
                   })
                  
               }
           })
        }else{
            res.send({message:"No user found"});
        }
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some error"});
    })
})

app.get("/products",verifyToken,(req,res)=>{

    productModel.find()
    .then((products)=>{
        res.send(products);
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some error"});
    })
    
    
})

function verifyToken(req,res,next){
    if(req.headers.authorization!=undefined){
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,"authdemo",(err,cred)=>{
            if(err){
                res.status(403).send({message:"Invalid Token"})
            }
            else{
               
                next();
    
            }
        })
    }
    else{
        res.status(400).send({message:"Token not found"})
    }
    
}

app.listen(8000);