// dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-type-email')

//  schema
const pizzaSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
/*    varients: {
        type: [],
        require: false
    },
    prices: {
        type: [],
        require: false  
    }, */
    category: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
}, {timestamps: true})

// create the mongoose model
const pizzasModel = mongoose.model('Pizzas', pizzaSchema, 'pizzas')   // this part is what matches the DB collection title, but Mongoose does some filtering of upper or lower case, and can pluralise words, so the third option passed in is the exact collection name

// export as module to use in other files
module.exports = pizzasModel