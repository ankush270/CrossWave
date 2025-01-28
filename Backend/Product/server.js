//main file for creating server in product service
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const db=require('./config/db');

//connect to database
db();

//creating server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//starting server
const PORT=process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
});
