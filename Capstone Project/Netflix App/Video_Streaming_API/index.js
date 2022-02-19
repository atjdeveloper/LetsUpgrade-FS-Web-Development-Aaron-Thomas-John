const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const userRouter = require('./controllers/user');
const videoRouter = require('./controllers/video');
const res = require('express/lib/response');

mongoose.connect("mongodb://localhost:27017/video_stream")
.then(()=>{console.log("Connection Successfull")})
.catch(()=>{
    console.log("Connection failed");
         
})

const app =express();

app.use(express.json());
app.use(cors());

app.use("/user",userRouter);
app.use("/videos",videoRouter);

app.listen(8000);