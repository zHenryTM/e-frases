const jwt = require("jsonwebtoken")

module.exports = (req, res, posts) => {
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
}