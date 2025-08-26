require('dotenv').config();
const connectDB=require('./config/db.js')
const express=require('express');
const cors=require('cors');
const app=express();

app.use(express.json());
const {errorHandler} =require('./middleware/errorMiddleware.js');
//app.use(express.urlencoded({ extended: true }));
connectDB();
app.use(cors({
    origin:['http://localhost:5173', 'https://url-shortner-smoky-three.vercel.app'],
    credentials:true,
}));

app.get('/',(req,res)=>{
    res.send("Api in running on nodemon");
})

const urlRoutes=require('./routes/urls.js');
app.use('/api',urlRoutes);

const authRoutes=require('./routes/auth.js');
app.use('/api/auth',authRoutes);

const linksRoutes=require('./routes/links.js');
app.use('/api/links',linksRoutes);

const indexRoutes=require('./routes/index');
app.use('/',indexRoutes);
app.use(errorHandler);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})