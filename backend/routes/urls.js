const express=require('express');
const router=express.Router();
const { shortenUrl } = require('../controllers/urlController.js');
const auth = require('../middleware/auth.js');

router.post('/shorten',auth,shortenUrl);

module.exports=router;