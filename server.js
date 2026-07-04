const express=require('express')
const dotenv = require("dotenv").config();
const connectDb = require('./config/dbConnection')
const app=express()
const path=require('path')
const errorHandler = require('./middleware/errorHandler')


connectDb();
const port=process.env.PORT||5000 
app.use(express.json())

app.use("/api/contacts",require(path.join(__dirname,'routes/contactRoutes.js')))
app.use("/api/users",require(path.join(__dirname,'routes/userRoutes.js')))
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})