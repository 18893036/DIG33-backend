// dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-type-email')

const ordersSchema= mongoose.Schema({
    name : {type: String , require: true},
    email: {type: String , require: true},
//    userid : {type: String , require: true},
//    orderItems : [],
//    shippingAddress : {type: Object, require: false},
//    orderAmount : {type:Number , require: true},
//    isDelivered : {type:Boolean , require: false , default: false},
//    transactionId : {type:String , require: false }
},{
    timestamps : true
})

// create the mongoose model
const ordersModel = mongoose.model('Orders', ordersSchema, 'orders')   // this part is what matches the DB collection title, but Mongoose does some filtering of upper or lower case, and can pluralise words, so the third option passed in is the exact collection name

// export as module to use in other files 
module.exports = ordersModel