const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {type : String , required : true},
    picture: {type : String , required : true},
    description: {type : String , required : true},
    gender: {type:String,required:true,enum:['male','female']},
    category: {type : String , required : true},
    price: {type : Number , required : true},
    userId:{type : String , required : true},
})

const ProductModel = mongoose.model("product", productSchema)

module.exports = {
    ProductModel
}  