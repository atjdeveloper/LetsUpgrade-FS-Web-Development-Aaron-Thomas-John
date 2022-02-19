const express = require('express');
const verifyToken = require('../verify_token');
const chatModel = require('../models/chat_model');

const router = express.Router();

router.post('/',verifyToken,(req,res) => {
    let chat = req.body;
    let chatObj = new chatModel(chat);
    chatObj.save()
    .then(() => {
        res.send({message:"chat sent"})

    })
    .catch((err) => {
        console.log(err)
        res.send({message:"some problem in sending chat"})
    })
})


router.get('/:user_id/:person_id',verifyToken,async (req, res) => {
    let user_id = req.params.user_id;
    let person_id = req.params.person_id;

    let myChats = await chatModel.find({user_s:user_id,user_r:person_id});
    
    let personChats = await chatModel.find({user_s:person_id,user_r:user_id});
    
})
module.exports = router;