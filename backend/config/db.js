require('dotenv').config();
// const Url=require('../models/Url.js');

const mongoose= require('mongoose');


const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        // await Url.deleteMany({});
        // console.log("All URLs deleted from Atlas collection");

    }
    catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1)
    }
}
module.exports=connectDB;