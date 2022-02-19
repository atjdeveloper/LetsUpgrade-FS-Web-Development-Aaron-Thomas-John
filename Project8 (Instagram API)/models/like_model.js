const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    post_id:{type:mongoose.Schema.Types.ObjectId,ref:'posts'},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'users'}
})

const likeModel = new mongoose.model('likes', likeSchema);

module.exports = likeModel;