const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('../Utils')

// schema
const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String    
  },
  image: {
    type: String,
    required: true    
  },
  equipmentType: {
    type: String,
    required: true    
  }
  
}, { timestamps: true })


// model
 const exerciseModel = mongoose.model('Exercise', exerciseSchema)

// export
 module.exports = exerciseModel