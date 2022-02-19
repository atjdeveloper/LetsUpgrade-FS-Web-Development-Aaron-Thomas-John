const express = require('express');
const videoModel = require('../models/video_model');
const verifyToken = require('../verify_token');
const userVideoModel = require('../models/user_video_model');
const fs = require('fs');
const router = express.Router();

router.get("/",verifyToken, async (req,res)=>{

    let videos = await videoModel.find();
    res.send(videos);
})

router.get("/:id",verifyToken, async (req,res)=>{
    
    let id = req.params.id;
    let videos = await videoModel.findOne({_id:id});
    res.send(videos);
})

router.get("/:user_id/:video_id",verifyToken,async (req,res)=>{

    let userVideo = {};
    userVideo.user = req.params.user_id;
    userVideo.video = req.params.video_id;
    let video_id = req.params.video_id;

    let video = await videoModel.findOne({_id:video_id});

    let userVideoObj = new userVideoModel(userVideo);
    
    userVideoObj.save()
    .then(()=>{
        res.send({success:true,message:"Video can be played",filepath:video.filepath})
    })
    .catch((err)=>{
        console.log(err);
        res.send({success:false,message:"Some problem in getting video info"})
    })


})


router.get("/playnow/player/:video_id",async (req,res)=>{

    let id = req.params.video_id;

    let video = await videoModel.findOne({_id:id});

    const range = req.headers.range;

    if(!range){
        res.send({message:"Range Header is required"});
    }

    const videosize = fs.statSync(__dirname + '/'+video.filepath).size;

    const start = Number(range.replace(/\D/g,""));
    const end = Math.min(start+(10**6),videosize-1)

    const contentlength = end-start+1;

    const headers = {
        "Content-Range":`bytes ${start}- ${end}/${videosize}`,
        "Accept-Ranges":"bytes", 
        "Content-Length":contentlength,
        "Content-Type":"video/mp4"
    }

    res.writeHead(206,headers);

    let videoReadStream = fs.createReadStream(video.filepath,{start,end});
    
    videoReadStream.pipe(res);

})
module.exports = router;