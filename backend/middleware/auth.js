const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    const token=req.header('x-auth-token');
    if (!token){
        return res.status(401).json({success:false,error:'no token, authorization denied'});

    }
    try{
        const decoder=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoder.user;
        next();
    }
    catch(err){
        console.error('token verification error:', err);
        return res.status(401).json({success:false,error:'token is not valid'});
    }
};

module.exports=auth;