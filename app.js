const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const app = express()

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

mongoose.connect("mongodb://localhost/e-frases")
    .then(() => app.listen(3000, () => console.log("Server started on port 3000. http://localhost:3000")))
    .catch(err => console.log("Error connecting to database..." + err))

require("./controllers/home/indexController")(app)
require("./controllers/create/userController")(app)
require("./controllers/create/postController")(app)
require("./controllers/logout/logoutController")(app)