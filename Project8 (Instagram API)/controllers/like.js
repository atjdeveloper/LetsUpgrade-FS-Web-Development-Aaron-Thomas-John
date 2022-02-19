const express= require('express');
const likeModel = require('../models/like_model');
const verifyToken = require('../verify_token');



const router = express.Router();

router.post('/',verifyToken,(req,res) => {
    let like = req.body;
    let likeObj = new likeModel(like);
    likeObj.save()
    .then(() => {
        res.send({message:"Liked"})
    })
    .catch((err) => {
        console.log(err);
        res.send({message:"some problem in liking"})
    })
})


router.delete('/:id',verifyToken,(req,res) => {
    let id = req.params.id;
    likeModel.deleteOne({_id:id}).then(() => {
        res.send({message:"Unliked"})
    })
    .catch((err) => {
        console.log(err);
        res.send({message:"some problem in unliking"})
    })
})

module.exports = router;