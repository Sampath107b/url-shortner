const mongoose=require('mongooe');
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
        typr:String,
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