const mongoose=require('mongooe');
const urlSchema=new mongoose.Schema({
    urlcode:{
        typr:String,
        required:true,
    },
    longurl:{
        type:String,
        required:true,
    },
    shorturl:{
        type:String,
        required:true,
    },
    clicks:{
        type:Number,
        required:true,
        default:0,
    },
    date:{
        type:Date,
        default:Date.now
    },


});

module.exports=mongoose.model('Url',urlSchema);