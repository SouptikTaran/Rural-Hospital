const express = require('express')
const app = express() ;
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const helmet = require('helmet');



const routes = require("./routes/index.routes")
const PORT = process.env?.PORT || 8000

app.use(cors({
    origin: ['http://localhost:3000' , 'http://frontend:3000'], // Allow requests from frontend origin
    credentials: true // Enable credentials (cookies)
  }));
  app.use(helmet());
app.use(express.json())

app.use('/' , routes)

app.listen(PORT ,'0.0.0.0' ,()=>{
    console.log(`SERVER STARTED http://0.0.0.0:${PORT}/`)
})