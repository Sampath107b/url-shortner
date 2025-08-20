const express=require('express');
const router=express.Router();
const auth = require('../middleware/auth.js');
router.get('/my-links',auth,(req,res)=>{
    res.status(200).json({message: 'This is the my-links endpoint'});
});

module.exports=router;