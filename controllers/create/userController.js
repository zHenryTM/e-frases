require("dotenv").config()

const router = require("express").Router()
const jwt = require("jsonwebtoken")
const User = require("../../models/User")

router.get("/create/user", (req, res) => {
    res.render("addUser")
})

router.post("/create/user", async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email})
        if(user) return res.send("User already exists!")

        user = await new User({...req.body}).save()
        user.password = undefined
        console.log(user)

        res.cookie("token", jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"}))
        res.redirect("/")
    } catch(err) {
        console.log("Error creating a new user..." + err)
    }
})

module.exports = app => app.use(router)