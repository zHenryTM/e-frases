const router = require("express").Router()

router.get("/logout", (req, res) => {
    res.clearCookie("token")
    res.clearCookie("userId")

    res.redirect("/")
})

module.exports = app => app.use(router)