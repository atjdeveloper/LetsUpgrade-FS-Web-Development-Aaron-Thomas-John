const express = require('express');
const verifyToken = require('../verify_token');
const connectionModel = require('../models/connection_model');
const userModel = require('../models/user_model');


const router = express.Router();

// to follow a connection
router.post('/follow',verifyToken,(req,res)=>{
    let connection = req.body;
    userModel.findOne({_id:connection.followed_id})
    .then((user)=>{
        if(user.private===true){
            connection.status = 1;
        }
        let connectionObj = new connectionModel(connection,user);
        connectionObj.save()
        .then(()=>{
            res.send({message:"Followed"});
        })
        .catch((err)=>{
            res.send({message:"Some error in following"});
            console.log(err);
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})


//to accept the request
router.put('/:id',verifyToken,(req,res)=>{
    let id = req.params.id;
    let newConnectionData = req.body;
    connectionModel.updateOne({_id:id},newConnectionData)
    .then(()=>{
        res.send({message:"Request Accepted"});
    })
    .catch((err)=>{
        res.send({message:"Some error in accepting the request"});
        console.log(err);
    })
})


//to delete a connection
router.delete('/:id',verifyToken,(req,res)=>{
    let id = req.params.id;
    connectionModel.deleteOne({_id:id})
    .then(()=>{
        res.send({message:"Unfollowed"});
    })
    .catch((err)=>{
        res.send({message:"Some error in unfollowing"});
        console.log(err);
    })
})


router.get('/:user_id',(req,res)=>{
    let id = req.params.user_id;
    let followers=[];
    let following=[];

    connectionModel.find({followed_id:id,status:0}).populate('follower_id')
    .then((data)=>{
        followers=data;
    })
    .catch((err)=>{
        console.log(err);
    })

    connectionModel.find({follower_id:id,status:0}).populate('followed_id')
    .then((data)=>{
        following=data;
    })
    .catch((err)=>{
        console.log(err);
    })

    let response = {followers:followers,following:following};
    res.send(response);
})

module.exports = router;