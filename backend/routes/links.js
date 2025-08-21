const express=require('express');
const router=express.Router();
const auth = require('../middleware/auth.js');
const { getMyLinks } = require('../controllers/linksController.js');
router.get('/my-links',auth, getMyLinks);

module.exports=router;