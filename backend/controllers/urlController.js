const validUrl=require('valid-url');
const Url=require('../models/Url.js');


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
        shortUrl=`${ProcessingInstruction.env.BASE_URL}/${urlcode}`;
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

module.exports={shortenUrl,};