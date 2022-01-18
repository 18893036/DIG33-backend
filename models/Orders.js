// dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-type-email')

const ordersSchema= mongoose.Schema({
    name : {type: String , require},
    email: {type: String , require},
    userid : {type: String , require},
    orderItems : [],
    shippingAddress : {type:Object},
    orderAmount : {type:Number , require},
    isDelivered : {type:Boolean , require , default: false},
    transactionId : {type:String , require, default: false}
},{
    timestamps : true
})

// create the mongoose model
const ordersModel = mongoose.model('Orders', ordersSchema, 'orders')   // this part is what matches the DB collection title, but Mongoose does some filtering of upper or lower case, and can pluralise words, so the third option passed in is the exact collection name

// export as module to use in other files 
module.exports = ordersModel