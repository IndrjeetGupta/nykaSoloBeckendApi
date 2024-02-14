const {Router} = require("express")
const {UserModel} = require('../models/User.model')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const useController = Router();

useController.post("/register" , (req , res) =>{
    const {name,email, password, avatar} = req.body
    
    bcrypt.hash(password , 5 , async function(err, hash) {
        if (err){
            res.send("something went wrong , plz try agsin later")
        }
        const user = new UserModel({
            name,
            email,
            password: hash,
            avatar
        }) 
        await user.save()
        res.json({message :"Signup successful"})
    }); 
   
})

useController.post("/login" ,async (req , res) =>{
    const {email, password} = req.body
    const user = await UserModel.findOne({email})
    const hash = user.password
    bcrypt.compare(password, hash, function(err, result) {
        if (err){
            res.send("Something went wrong , plz try again")
        }
        if (result){
            const token = jwt.sign({ userId: user._id }, process.env.secretCode);
            res.json({message : "Login successfull" , token})
        }
        else { 
            res.send("invalid credential , plz signup ")
        }
    });
    // res.send("Login")
})

module.exports = {
    useController
}