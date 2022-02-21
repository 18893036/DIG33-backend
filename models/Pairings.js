// dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-type-email')

//  schema
const pairingsSchema = new mongoose.Schema({
    pigProduct: {
        type: String,
        require: true
    },
    dishName: {
        type: String,
        require: true
    },
    ingredients: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        require: true
    }
}, {timestamps: true})

// create the mongoose model
const pairingsModel = mongoose.model('Pairings', pairingsSchema, 'pairings')   // this part is what matches the DB collection title, but Mongoose does some filtering of upper or lower case, and can pluralise words, so the third option passed in is the exact collection name

// export as module to use in other files
module.exports = pairingsModel