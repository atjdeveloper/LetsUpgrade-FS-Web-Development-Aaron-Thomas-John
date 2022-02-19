const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const userModel = require('./models/user_model');
// const postModel = require('./models/post_model');
// const connectionModel = require('./models/connection_model');
// const commentModel = require('./models/comment_model');
// const chatModel = require('./models/chat_model');
// const likeModel = require('./models/like_model');
const userRouter = require('./controllers/user');
const postRouter = require('./controllers/post');
const connectionRouter = require('./controllers/connection');
const commentRouter = require('./controllers/comment');
const likeRouter = require('./controllers/like');
const chatRouter = require('./controllers/chat');

const app = express();
mongoose.connect("mongodb://localhost:27017/instagram_api")
.then(()=>{
    console.log("Connection successfull");
})
.catch((err)=>{
    console.log(err);
})


app.use(express.json());
app.use(cors());

app.use('/user',userRouter);
app.use('/post',postRouter);
app.use('/connection',connectionRouter);
app.use('/comment',commentRouter);
app.use('/like',likeRouter);
app.use('/chat',chatRouter);

app.listen(8000);