const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
}, {timestamps: true})

userSchema.pre("save", async function(next) {
    try {
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash

        next()
    } catch(err) {
        console.log("Error hashing user's password..." + err)
    }
})

module.exports = mongoose.model("User", userSchema)