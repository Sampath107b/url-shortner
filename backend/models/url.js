const mongoose=require('mongoose');
const urlSchema=new mongoose.Schema({
    longurl:{
        type:String,
        required:true,
    },
    shorturl:{
        type:String,
        required:true,
    },
    urlcode:{
        type:String,
        required:true,
    },
    Clicks:{
        type:Number,
        required:true,
        default:0,
    },
    date:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false,
    },


});

module.exports=mongoose.model('Url',urlSchema);