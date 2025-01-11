const express=require('express')
const app=express()
const PORT=process.env.PORT||8000
require('../db/conn')
require('dotenv').config()
const authrouter = require('../routes/authRoute');
const apirouter = require('../routes/apiRoute');
const cors = require('cors');
app.use(express.json())

app.use(
    cors({
      origin: 'http://localhost:5173',
    })
  );

app.use('/auth',authrouter);
app.use('/api',apirouter);


const start=async()=>{
    try{
        app.listen(PORT,()=>{
            console.log(`Server Running successfully on ${PORT}`)
        }) 
    }
    catch(err){
        console.log(err)
    }
}
start()
