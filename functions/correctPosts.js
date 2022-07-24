const tagsFormatted = require("./tags")
const Post = require("../models/Post")

module.exports = async (req) => {
    let search = req.body.search
    let posts = await Post.find({}).populate("author")
    let correctPost = []

    search = tagsFormatted(search)

    search.forEach(search => {
        posts.forEach(data => {
            let dataTags = data.tags
            let dataPhrase = data.frase

            dataTags.forEach(tag => {
                if (tag === search) {
                    correctPost.push(data)
                }
            })

            dataPhrase = dataPhrase.split(" ")
            dataPhrase.forEach(phrase => {
                if (phrase === search) {
                    correctPost.push(data)
                } 
            })
        })
    })

    correctPost = correctPost.filter((data, index) => {
     return correctPost.indexOf(data) === index
    })

    return correctPost
}