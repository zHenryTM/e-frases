require("dotenv").config()

const router = require("express").Router()
const jwt = require("jsonwebtoken")

const User = require("../../models/User")
const Post = require("../../models/Post")

const authMiddleware = require("./../../middlewares/auth")
const tagsFormatted = require("./../../functions/tags")

router.get("/create/post", authMiddleware, (req, res) => {
    res.render("addPost")
})

router.post("/create/post", authMiddleware, async (req, res) => {
    try {
        let { frase, tags } = req.body
        let userId = req.cookies.userId

        let user = await User.findById(userId)

        tags = tagsFormatted(tags)

        let post = await new Post({
            frase: frase,
            tags: tags,
            author: user._id 
        })

        post.save()
            .then(async post => {
                user = await User.findByIdAndUpdate(userId, {$push: {posts: post._id}})
                res.redirect("/")
            })
            .catch(err => console.log("something went wrong..." + err))

    } catch(err) {
        console.log("Error creating a new post..." + err)
    }
})

module.exports = app => app.use(router)