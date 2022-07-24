require("dotenv").config()

const router = require("express").Router()
const jwt = require("jsonwebtoken")

const Post = require("./../../models/Post")
const correctPosts = require("../../functions/correctPosts")

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "-password").sort({createdAt: -1})
        const auth = req.cookies.token
            
        if(!auth) {
            console.log("Sem auth")
            res.render("index", {posts: posts, isAuth: false})
        } else {
            jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
                if(err) {
                    console.log("Erro ao verificar - Token inválido")
                    res.render("index", {posts: posts, isAuth: false})
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

router.post("/filter/search", async (req, res) => {
    let posts = await correctPosts(req)

    console.log(posts)
    console.log(typeof posts)

    if(posts) {
        const auth = req.cookies.token
        
        if(!auth) {
            console.log("Sem auth")
            res.render("index", {posts: posts, isAuth: false})
        } else {
            jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
                if(err) {
                    console.log("Erro ao verificar - Token inválido")
                    res.render("index", {posts: posts, isAuth: false})
                } else {
                    console.log("Está autenticado!")
                    res.render("index", {posts: posts, isAuth: true})
                }
            })
        }
    } else {
        res.redirect("/")
    }

    
})

module.exports = app => app.use(router)