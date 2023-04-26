// import mongoose
const mongoose = require('mongoose')

// state connect string

mongoose.connect("mongodb://localhost:27017/foodServer",{useNewUrlParser:true})

// model(schema) creation (model name must be singular of collectionName and first letter must be Capital)
// schema means fields and value types
const User=mongoose.model('User',{
    fname:String,
    lname:String, 
    phone:String, 
    email:String, 
    password:String,
    cart:Array
})

const Food=mongoose.model('Food',{
  
id:Number,
foodName:String,
foodDetails:String,
foodPrice:String,
foodImg:String
})

module.exports={
    User,
    Food
}