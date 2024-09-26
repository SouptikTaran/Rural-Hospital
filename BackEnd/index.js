const express = require('express')
const app = express() ;
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const helmet = require('helmet');



const routes = require("./routes/index.routes")
const PORT = process.env?.PORT || 8000

app.use(cors());
app.use(helmet());


app.use('/' , routes)

app.listen(PORT , ()=>{
    console.log(`SERVER STARTED http://localhost:${PORT}/`)
})