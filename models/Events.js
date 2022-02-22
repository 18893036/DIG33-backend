// dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-type-email')

//  schema
const eventsSchema = new mongoose.Schema({
    eventTitle: {
        type: String,
        require: true
    },
    eventLocation: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    isActive: {
        type: Boolean
    }
}, {timestamps: true})

// create the mongoose model
const eventsModel = mongoose.model('Events', eventsSchema, 'events')   // this part is what matches the DB collection title, but Mongoose does some filtering of upper or lower case, and can pluralise words, so the third option passed in is the exact collection name

// export as module to use in other files
module.exports = eventsModel