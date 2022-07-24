const tagsFormatted = require("./tags")
const Post = require("../models/Post")

module.exports = async (req) => {
    let search = req.body.search

    search = tagsFormatted(search)
    search = search.toString()

    let posts = await Post.find({}).populate("author")
    let correctPost = []

    posts.forEach(data => {
        let dataTags = data.tags
        let dataPhrase = data.frase

        dataTags.forEach(tag => {
            if (tag === search) return correctPost.push(data) 

        })

        dataPhrase = dataPhrase.split(" ")
        dataPhrase.forEach(phrase => {
            if (phrase === search) return correctPost.push(data)
        })
    })

    return correctPost
}