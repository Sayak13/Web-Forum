const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    comment : {
        type : String,
        required : true
    },
    id : {
        type : String,
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

  module.exports = mongoose.model('Comment', commentSchema);