// dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-type-email')

//  schema
const cidersSchema = new mongoose.Schema({
    ciderTitle: {
        type: String,
        require: true
    },
    ciderType: {
        type: String,
        require: true
    },
    ciderSlogan: {
        type: String,
        require: true
    },
    image: {
        type: String
    }
}, {timestamps: true})

// create the mongoose model
const cidersModel = mongoose.model('Ciders', cidersSchema, 'ciders')   // this part is what matches the DB collection title, but Mongoose does some filtering of upper or lower case, and can pluralise words, so the third option passed in is the exact collection name

// export as module to use in other files
module.exports = cidersModel