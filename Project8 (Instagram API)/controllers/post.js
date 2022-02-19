const express = require('express');
const verifyToken = require('../verify_token');
const postModel = require('../models/post_model');
const connectionModel = require('../models/connection_model');


const router = express.Router();

router.post('/',verifyToken,(req,res)=>{
    let post = req.body;
    let postObj = new postModel(post);
    postObj.save()
    .then(()=>{
        res.send({message:"Post Created"});
    })
    .catch((err)=>{
        res.send({message:"Some problem in creating post"});
        console.log(err);
    })

})

router.delete('/:id',verifyToken,(req,res)=>{
    let id = req.params.id;
    postModel.deleteOne({_id:id})
    .then(()=>{
          res.send({message:"Post Deleted"});
    })
    .catch((err)=>{
        res.send({message:"Some problem in deleting post"});
        console.log(err);
    })
})

router.put('/:id',verifyToken,(req,res)=>{
    let id = req.params.id;
    let newPostData = req.body;
    postModel.updateOne({_id:id,newPostData})
    .then(()=>{
        res.send({message:"Post Updated"});
    })
    .catch((err)=>{
        res.send({message:"Some problem in updating post"});
        console.log(err);
    })
})

router.get('/feeds/:user_id',verifyToken,(req,res)=>{
    let id = req.params.user_id;
    connectionModel.find({followed_id:id,status:0})
    .then((data)=>{
        let folllower_ids = data.map((connection,index)=>{
            return connection.follower_id;
        })

        let myPost=[];
        let followerPosts =[];

        postModel.find({user:id})
        .then((posts)=>{
            myPost = posts;
        })

        postModel.find({user:{$in:follower_ids}})
        .then((posts)=>{
            followerPosts = posts;
        })

    })
    .catch((err)=>{
        console.log(err)
    })
})

module.exports = router;