require("dotenv").config()

const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const auth = req.cookies.token

    if(!auth) {
        console.log("There's no Token here... :(")
        res.send("There's no Token here... :(")
    } else {
        jwt.verify(auth, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                console.log("Invalid Token!")
                res.send("Invalid Token!")
            } else {
                res.cookie("userId", decoded.id)
                next()
            }
        })
    }
}