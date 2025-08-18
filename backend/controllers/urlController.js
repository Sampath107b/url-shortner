const validUrl=require('valid-url');
const Url=require('../models/Url.js');
const bcrypt=require('bcryptjs');
const User=require('../models/User.js');


const shortenUrl = async(req,res)=>{
    const longUrl=req.body;
    console.log('recieved url',longUrl);
    if (!longUrl){
        return res.status(400).json({success:false,error:'please provide a long URL'});
    }

    if (!validUrl.isUri(longUrl)){
        return res.status(400).json({success:false,error:'please provide a valid URL'});
    }

    try{
        let url=await Url.findOne({longurl:longUrl});
        if (url){
            return res.status(200).json({success:true,data:url});
        }
        
        const {nanoid}=await import('nanoid');
        const urlCode=nanoid(7);
        shortUrl=`${process.env.BASE_URL}/${urlCode}`;
        url=await Url.create({
            longUrl,
            shortUrl,
            urlCode,
        });
        res.status(201).json({success:true,data:url});


    }
    catch(err){
        console.log('database error:',err);
        res.status(500).json({success:false,error:'internal server error'});
    }

    




    res.status(200).json({success:true, message:'controller is working',data:{'recieved url':longUrl}});
};

const redirectToUrl =async(req,res)=>{
    try{
        const url=await Url.findOne({urlCode:req.params.code});
        if (url){
            url.Clicks++;
            return res.redirect(301,url.longUrl);
            await url.save();
            return res.statur(200).json({
                success:true,
                message:'url found',
                data:url,
            });
        }
        else{
            return res.status(404).json({
                success:false,
                error:'url not found',
            });
        }

    }
    catch(err){
        console.error('database error:', err);
        return res.status(500).json({success:false,error:'internal server error'});
    }
};


const registerUser=async (res,req)=>{
    try{
        const {name,email,password}=req.body;
        if (!name || !email || !password){
            return res.status(400).json({success:false,error:'please provide all fields'});
        }
        const exists=await User.findOne({email});
        if (exists){
            return res.status(400).json({success:false,error:'user already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=await User.create({
            name,
            email,
            password:hashedPassword,
        });
        res.status(201).json({
            success:true,
            message:'user registered successfully',
            data:{
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
            }
        });
    }
    catch(err){
        console.error('database error:',err);
        res.status(500).json({success:false,error:'internal server error'});
    }
};
const loginUser=async (req,res)=>{
    try{
        const {email,password}=req.body;
        if (!email || !password){
            return res.status(400).json({success:false,error:'please provide all fields'});
        }
        const user=await User.findOne({email}).select('+password');
        if (!user){
            return res.status(400).json({success:false,error:'invalid credentials'});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if (!isMatch){
            return res.status(400).json({success:false,error:'invalid credentials'});
        }
        res.status(200).json({
            success:true,
            message:'user logged in successfully',
            
        });
    }
    catch(err){
        console.error('database error:',err);
        res.status(500).json({success:false,error:'internal server error'});
    }

};

module.exports={shortenUrl,redirectToUrl, registerUser, loginUser,};