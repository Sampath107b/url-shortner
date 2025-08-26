const validUrl=require('valid-url');
const Url=require('../models/url.js');
const bcrypt=require('bcryptjs');
const User=require('../models/user.js');
const jwt=require('jsonwebtoken');


const shortenUrl = async(req,res)=>{
    const {longUrl}=req.body;
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
        const ShortUrl=`${process.env.BASE_URL}/${urlCode}`;
        const newUrlData={
            longurl:longUrl,
            shorturl:ShortUrl,
            urlcode:urlCode,
        };
        if (req.user){
            newUrlData.user=req.user.id;
        }
        url=await Url.create(newUrlData);



        res.status(201).json({success:true,data:url});


    }
    catch(err){
        console.log('database error:',err);
        res.status(500).json({success:false,error:'internal server error'});
    }

    




    // res.status(200).json({success:true, message:'controller is working',data:{'recieved url':longUrl}});
};

const redirectToUrl =async(req,res)=>{
    try{
        const url=await Url.findOne({urlcode:req.params.code});
        if (url){
            url.Clicks++;

            await url.save();
            return res.redirect(301,url.longurl);
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


const registerUser=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        if (!name || !email || !password){
            return res.status(400).json({success:false,error:'please provide all fields'});
        }

        
        const exists=await User.findOne({email:email});
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
        const payLoad={
            user:{_id:newUser._id,},
        };
        const token=jwt.sign(payLoad,process.env.JWT_SECRET,{
            expiresIn:'3d',
        });
        res.status(201).json({
            success:true,
            message:'user registered successfully',
            data:{
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                token:token,
            }
        });
    }
    catch(err){
        if (err.name==='ValidationError'){
            const messages=Object.values(err.errors).map((val)=>val.message);
            return res.status(400).json({success:false,error:messages.join(',')});
        }
        console.error('database error:',err);

        res.status(500).json({success:false,error:'internal server error'});
    }
};
const loginUser=async (req,res)=>{
    try{
        const {email,password}=req.body;
        if (!email || !password){
            res.status(400); 
            throw new Error('Please provide an email and password');
        }
        const user=await User.findOne({email}).select('+password');
        if (!user){
            res.status(401); // Unauthorized
            throw new Error('Invalid credentials');
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if (!isMatch){
            res.status(401); // Unauthorized
            throw new Error('Invalid credentials');
        }
        
        const payLoad={
            user:{_id:user._id,},
        };
        const token=jwt.sign(payLoad,process.env.JWT_SECRET,{
            expiresIn:'3d',
        });
        res.status(200).json({
            success:true,
            token:token,
        });

    }
    catch(err){
        // console.error('database error:',err);
        next(err);
    }

};

module.exports={shortenUrl,redirectToUrl, registerUser, loginUser,};