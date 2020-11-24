const mongoose = require('mongoose')

const Code = mongoose.model('code',{
    code:{
        type:String,
        unique: true,
    },
    sent:{
        type:Boolean,
        default:false
    }, 
    confirmed:{
        type:Boolean,
        default:false
    }    
})
module.exports= Code