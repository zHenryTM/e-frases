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
    }
}, {timestamps: true})

module.exports = mongoose.model("Post", postSchema)