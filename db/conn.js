require('dotenv').config()
const mongoose=require('mongoose')
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("mongodb connected successfully")
}).catch((err)=>{
    console.log("Mongodb not connected...")
})