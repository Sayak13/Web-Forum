const express = require('express')
const app = express()
app.use(express.json({extended:true}))
app.use(express.urlencoded())
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
mongoose.connect('mongodb://localhost/webForum',{useNewUrlParser: true,useUnifiedTopology: true},function(error){
  if(!error){
    console.log("Successfully connected")
  }
});
const port = 3000

// endpoints to serve the html
app.get('/', (req, res) => {
  res.sendFile("pages/home.html", {root: __dirname})
})

app.get('/login', (req, res) => {
    res.sendFile("pages/login.html", {root: __dirname})
  })

app.get('/signup', (req, res) => {
    res.sendFile("pages/signup.html", {root: __dirname})
  })

app.get('/post', (req, res) => {
    res.sendFile("pages/commentPage.html", {root: __dirname})
  })

// endpoint for api
app.post('/getposts', async (req, res) => {
    let posts = await Post.find()
    res.status(200).json({success: true, posts})
  })

app.post('/getpost', async (req, res) => {
    let posts = await Post.findOne({_id:req.body._id})
    res.status(200).json({posts})
  })

app.post('/getcomment', async (req, res) => {
    let comments = await Comment.find({id:req.body.id})
    res.status(200).json({success: true, comments})
  })

app.post('/login', async (req, res) => {
    const {userToken} = req.body
    let user = await User.findOne(req.body)
    if(!user){
      res.status(200).json({success:false, message: "No user found"})
    }
    else{
      res.status(200).json({success:true, user: {email: user.email}, message: "User found"})
    }
  })

app.post('/signup',async (req, res) => {
    const {userToken} = req.body
    const usermail = await User.findOne({email: req.body.email});
    if(usermail) {
      res.status(400).json({success:false})
    } else {
      console.log(req.body)
      let user = await User.create(req.body)
      res.status(200).json({success:true,user:user })
    }
  })

app.post('/addposts', async (req, res) => {
    const {userToken} = req.body
    let email1 = req.body.email
    let user1 =await User.findOne({email: email1},{name:1})
    let name=user1.name
    let post = await Post.create({title : req.body.title, subject : req.body.subject, desc : req.body.desc, likeCount : req.body.likeCount, dislikeCount : req.body.dislikeCount, name : name, email : email1})
    //let post = await Post.create(req.body)
    res.status(200).json({success:true, post })
  })

app.post('/addcomments', async (req, res) => {
    const {userToken} = req.body
    let id = req.body.id
    let post =await Post.findOne({_id: id})
    let name=await User.findOne({email: req.body.email})
    let comments = await Comment.create({comment : req.body.comment, id : id, name : name.name, email : req.body.email})
    res.status(200).json({success:true, comments })
  })

app.post('/deleteposts', async (req, res) => {
    const {userToken} = req.body
    const post = await Post.deleteOne({_id: req.body.id});
    const comment = await Comment.deleteMany({id: req.body.id});
    if(post) {
      res.status(200).json({success:true})
    } else {
      res.status(200).json({success:false})
    }
  })

app.post('/deleteAccount', async (req, res) => {
    const {userToken} = req.body
    const user = await User.deleteOne({email: req.body.email});
    if(user) {
      res.status(200).json({success:true})
    } else {
      res.status(200).json({success:false})
    }
  })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})