const express= require("express");
const dotEnv= require('dotenv');
const mongoose= require("mongoose");
const vendorRoute=require("./routes/vendorRoute");
const firmRoute= require('./routes/firmRoute');
const productRoute= require('./routes/productRoute');
const bodyParser=require("body-parser");
const path= require('path');

const cors = require("cors");



dotEnv.config();


const app=express();

const PORT=process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI,{serverSelectionTimeoutMS:30000})
   .then(()=>console.log("Connected to Mongo database successfully"))
   .catch((error)=>console.log(error));

   
app.use(cors());
app.use(bodyParser.json());

app.use('/vendor',vendorRoute);
app.use('/firm',firmRoute);
app.use('/product',productRoute);
app.use('/uploads',express.static('uploads'));
app.use('/', (req,res)=>{
    res.send("<h1>Hello, Welcome to Speedy</h1>")
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})
