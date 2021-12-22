// dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-type-email')

//  schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    }
}, {timestamps: true})

// create the mongoose model
const userModel = mongoose.model('User', userSchema, 'users')   // this part is what matches the DB collection title, but Mongoose does some filtering of upper or lower case, and can pluralise words, so the third option passed in is the exact collection name

// export as module to use in other files
module.exports = userModel