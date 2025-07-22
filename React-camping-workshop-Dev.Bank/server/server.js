//import library
const cors = require('cors')
const express = require('express')
const app =express()
const {readdirSync} =require('fs')
const morgan = require('morgan');
const handleErrors = require('./middlewares/error');
require('dotenv/config')
const { clerkMiddleware } = require ("@clerk/express")
const cookieParser = require('cookie-parser');

//middleware
app.use(cors());  //ติดไว้ก่อน
app.use(express.json({limit:'10mb'}))
app.use(morgan('dev'))
app.use(cookieParser());
// middleware
app.use(clerkMiddleware());
readdirSync('./routes').map((e)=>app.use('/api',require(`./routes/${e}`)))

app.use(handleErrors)



const PORT = 5000
app.listen(PORT,()=>{console.log(`server is running on port: ${PORT}`)})