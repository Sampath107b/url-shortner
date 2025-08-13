require('dotenv').config();
const connectDB=require('./config/db.js')
const express=require('express');
const app=express();
app.use(express.json());
connectDB();

app.get('/',(req,res)=>{
    res.send("Api in running on nodemon");
})

const urlRoutes=require('./routes/urls.js');
app.use('/api',urlRoutes);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})