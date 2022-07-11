require("dotenv").config

const router = require("express").Router()
const User = require("./../../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        let user = await User.findOne({ email })
        if(!user) return res.send("User not found")
        if(!await bcrypt.compare(password, user.password)) return res.send("Incorrect Password")

        res.cookie("token", jwt.sign({id: user._id}, process.env.JWT_SECRET))
        res.redirect("/")
        
    } catch(err) {
        console.log(err)
        res.send(err)
    }
})

module.exports = app => app.use(router)