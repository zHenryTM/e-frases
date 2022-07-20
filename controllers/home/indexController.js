require("dotenv").config()

const router = require("express").Router()
const Post = require("./../../models/Post")
const jwt = require("jsonwebtoken")
const tagsFormatted = require("../../functions/tags")

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

router.post("/filter/search", async (req, res) => {
    let search = req.body.search

    search = tagsFormatted(search)
    search = search.toString()

    let posts = await Post.find({}).populate("author")
    let correctPost = []

    posts.forEach(data => {
        dataTags = data.tags

        dataTags.forEach(tag => {
            if (tag === search) return correctPost.push(data)
        })
    })

    posts = correctPost

    console.log(posts)

    if(posts) {
        const auth = req.cookies.token
        
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
    } else {
        res.redirect("/")
    }

    
})

module.exports = app => app.use(router)