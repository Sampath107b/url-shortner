const Url = require('../models/Url.js');

const getMyLinks=async (req,res){
    try{
        if(!req.user){
            return res.status(401).json({success:false,error:'unauthorized access'});
        }

        
    }

}