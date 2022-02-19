const express = require('express');
const verifyToken = require('../verify_token');
const commentModel = require('../models/comment_model');

const router = express.Router();

router.post('/',verifyToken,(req,res) => {
    let comment = req.body;
    let commentObj = new commentModel(comment);
    commentObj.save()
    .then(() => {
        res.send({message:"Comment created"})

    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some problem in creating comment"});
    })
})



router.delete('/:id',verifyToken,(req, res)=>{
    let id = req.params.id;
    commentModel.deleteOne({_id:id})
    .then(()=>{
        res.send({message:"Comment deleted successfully."});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some problem in deleting comment"})
    })
})

module.exports = router;
