const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter your name']
    },
    email:{
        type:String,
        required:[true,'please enter your email'],
        unique:true,
        pattern:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please enter a valid email address'],
    },
    password:{
        type:String,
        required:[true,'please enter your passsword'],
        minlength:[6,'password must be at least 6 characters'],
        select:false,
    }

},{
    timestamps:true,
});

module.exports=mongoose.model('User',userSchema);