// dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-type-email')

//  schema
const merchandiseSchema = new mongoose.Schema({
    itemType: {
        type: String,
        require: true
    },
    itemName: {
        type: String,
        require: true
    },
    itemSize: {
        type: String,
        require: true
    },
    itemCost: {
        type: String,
        require: true
    }
}, {timestamps: true})

// create the mongoose model
const merchandiseModel = mongoose.model('Merchandise', merchandiseSchema, 'merchandise')   // this part is what matches the DB collection title, but Mongoose does some filtering of upper or lower case, and can pluralise words, so the third option passed in is the exact collection name

// export as module to use in other files
module.exports = merchandiseModel