require("dotenv").config()

const router = require("express").Router()
const Post = require("./../../models/Post")
const jwt = require("jsonwebtoken")

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "-password").sort({createdAt: -1})
        const auth = req.cookies.token

        console.log(auth)
            
        if(!auth) {
            console.log("Sem auth")
            res.render("index", {posts: posts, isAuth: false})
        } else {
            jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
                if(err) {
                    console.log("Erro ao verificar - Token inválido")
                    res.render("index", {post: posts, isAuth: false})
                } else {
                    console.log("Está autenticado!")
                    res.render("index", {posts: posts, isAuth: true})
                }
            })
        }   
    } catch(err) {
        console.log("Error showing posts" + err)
        res.send("Error showing posts")
    }
})

module.exports = app => app.use(router)