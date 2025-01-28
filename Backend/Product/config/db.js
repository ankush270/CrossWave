dotenv=require('dotenv');
const mongoose=require('mongoose');
const MONGO_URL=process.env.MONGO_URL;
const db=async ()=>{
    try{
    await mongoose.connect(MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    });
    console.log('Connected to database');
}
catch(err){
    console.log('Error connecting to database',err);
    }
}
module.exports=db;