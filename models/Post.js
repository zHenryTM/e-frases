const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
    frase: {
        type: String,
        required: true
    },
    tags: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    year: String
}, {timestamps: true})

postSchema.pre("save", async function(next) {
    let date = new Date()
    let year = date.getFullYear()

    this.year = year

    next()
})


module.exports = mongoose.model("Post", postSchema)