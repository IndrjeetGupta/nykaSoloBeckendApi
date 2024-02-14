const {Router} = require("express")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const noteController = Router();
const {ProductModel} = require('../models/Note.model')





noteController.get('/products', async(req , res) =>{
    const products = await ProductModel.find({userId : req.body.userId})
    res.send(products)
})

noteController.get('/products/:productId', async(req , res) =>{
    const {productId} = req.params
    // if u use this method any user can delete the items  
    // const deleteProduct = await ProductModel.findByIdAndDelete({_id : productId})

    const idProduct = await ProductModel.findById({_id : productId, userId : req.body.userId})
    res.send(idProduct)
    
})

noteController.post('/products', async(req , res) =>{
    const {name, picture, description, gender,category,price, userId} = req.body
    const product = new ProductModel({
        name,
        picture,
        description,
        gender,
        category,
        price,
        userId
    })

    try{
        await product.save()
        res.send("product create")
    }
    catch(err){
        res.send("something went wrong")
    }
})



noteController.delete('/products/:productId', async(req , res) =>{
    const {productId} = req.params
    // if u use this method any user can delete the items  
    // const deleteProduct = await ProductModel.findByIdAndDelete({_id : productId})

    const deleteProduct = await ProductModel.findOneAndDelete({_id : productId, userId : req.body.userId})
    if (deleteProduct){
        res.send("delete")
    }
    else {
        res.send(" counldn't delete")
    }
    
})
noteController.patch('/products/:productId', async(req , res) =>{
    const {productId} = req.params
    // if u use this method any user can delete the items  
    // const deleteProduct = await ProductModel.findByIdAndDelete({_id : productId})

    const editProduct = await ProductModel.findOneAndUpdate({_id : productId, userId : req.body.userId},{...req.body})
    if (editProduct){
        res.send("updated")
    }
    else {
        res.send(" counldn't updated")
    }
    
})

module.exports = {
    noteController
}