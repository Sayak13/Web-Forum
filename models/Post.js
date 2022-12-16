const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    likeCount : {
        type : Number,
        required : true
    },
    dislikeCount : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    }
  },{timestamps:true});

  module.exports = mongoose.model('Post', postSchema);