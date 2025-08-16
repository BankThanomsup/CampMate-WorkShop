//import library
const cors = require('cors')
const express = require('express')
const app =express()
const {readdirSync} =require('fs')
const morgan = require('morgan');
const handleErrors = require('./middlewares/error');
require('dotenv/config')
const { clerkMiddleware } = require ("@clerk/express")
const cookie = require("cookie");
//middleware
app.use((req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  req.cookies = cookies;
  next();
});
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://react-camping-470y4ooot-bankthanomsups-projects.vercel.app'],
  credentials: true,
}));
app.use(express.json({limit:'10mb'}))
app.use(morgan('dev'))
// middleware
app.use(clerkMiddleware());
readdirSync('./routes').map((e)=>app.use('/api',require(`./routes/${e}`)))

app.use(handleErrors)



// health checks
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{console.log(`server is running on port: ${PORT}`)})