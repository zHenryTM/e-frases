require("dotenv").config()

const router = require("express").Router()

const Post = require("./../../models/Post")
const correctPosts = require("../../functions/correctPosts")
const showIndexPosts = require("../../functions/showIndexPosts")

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "-password").sort({createdAt: -1})
        showIndexPosts(req, res, posts)   
    } catch(err) {
        console.log("Error showing posts" + err)
        res.send("Error showing posts")
    }
})

router.post("/filter/search", async (req, res) => {
    let posts = await correctPosts(req)

    if(posts) {
        showIndexPosts(req, res, posts)
    } else {
        res.redirect("/")
    }   
})

module.exports = app => app.use(router)