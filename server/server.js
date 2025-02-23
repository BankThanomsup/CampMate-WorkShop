//import library
const cors = require('cors')
const express = require('express')
const app =express()

const {readdirSync} =require('fs')


// const campingRoute = require('./routes/camping');
// const profileRoute = require('./routes/profile');
const morgan = require('morgan');
const e = require('express');
const handleErrors = require('./middlewares/error');
//middleware
app.use(cors());  //ติดไว้ก่อน
app.use(express.json())
app.use(morgan('dev'))

// app.use('/api',campingRoute)
// app.use('/api',profileRoute)
//Method
//get post put patch delete
// app.get('/',(req,res)=>{
//     console.log("Hello easy back end");
//     // res.send('hello Easy BackEnd');
//     res.json('roitai')
// // })
// console.log(readdirSync('./routes'))
readdirSync('./routes').map((e)=>app.use('/api',require(`./routes/${e}`)))
// app.get('/camping',(req,res)=>{
//     res.send('Hello camping')
// })

app.use(handleErrors)



const PORT = 5000
app.listen(PORT,()=>{console.log(`server is running on port: ${PORT}`)})