require('dotenv').config()
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const router = require('./routes/user.routes')
const cookieParser=require('cookie-parser')
app.use(express.json())
app.use(cookieParser())


async function connectdb(){
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connection socceddedddd with mongodb")
}

connectdb()


app.use("/api/v1/response",router)







app.listen(3000)



