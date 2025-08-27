const Url = require('../models/url.js');

const getMyLinks=async (req,res)=>{
    try{
        if(!req.user){
            return res.status(401).json({success:false,error:'unauthorized access'});
        }
        console.log("👤 req.user in getMyLinks:", req.user);

        const links = await Url.find({user:req.user.id}).sort({date:-1});
        console.log("📊 Links fetched:", links);
        return res.status(200).json({success:true,length:links.length,data:links});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({success:false,error:'internal server error'});
    }

};

module.exports={getMyLinks,};