const express = require("express")
const cors = require("cors")

const {useController} = require('./routes/user.routes')
const {noteController} = require('./routes/notes.routes')
const {connection} = require('./config/db')
const {UserModel} = require('./models/User.model')
const {authentication} = require('./middlewares/authentication')
const app = express();
const PORT = 8080

app.use(express.json())   

app.get("/",(req, res) =>{ 
    res.send("Home Page")
})

app.use(cors())

app.use('/api', useController)
app.use(authentication)

app.use("/api" ,noteController)
 

app.listen(PORT, async() =>{
    try{
        await connection;
        console.log("connet to mongoDb")
    }
    catch(err){
        console.log("error connecting to Db")
        console.log(err)
    }
    console.log(`listening on port ${PORT}`)
})