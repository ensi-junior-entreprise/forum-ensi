const mongoose = require('mongoose')

const Register = mongoose.model('register',{
    nom:{
        type: String,
        require :true
    },
    email:{
        type: String,
        require :true
    },
    num_tel:{
        type: String,
        require :true
    },
    institut:{
        type: String,
        require :true
    },
    accord:{
        type:Boolean,
        require :true
    },
    cv :{
        type:String,
    },

})
module.exports= Register