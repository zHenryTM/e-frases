const router = require("express").Router()
const Post = require("./../../models/Post")

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().populate("author").sort({createdAt: -1})

        res.render("index", {posts: posts})
    } catch(err) {
        console.log("Error showing posts" + err)
        res.send("Error showing posts")
    }
})

module.exports = app => app.use(router)