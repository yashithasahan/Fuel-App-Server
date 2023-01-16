const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        trim: true,
    },
    email:{
        required:true,
        type: String,
        trim: true,
        validate:{
            validator: (value) =>{
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message:'Please Enter a valid email address',
        },
    },
    password:{
        required:true,
        type: String,
        validate:{
            validator: (value) =>{

                return value.length > 6;
            },
            message:'pleae enter a long password',
        },
    },
    address:{
        type: String,
        default: '',
    },
    type:{
        type: String,
        default: 'user',
    },
     isInQueue:{
        type: Boolean,
        required: true,
        default:false,
    },
    duration:{
        type: Number,
        default: 0,
    },
    isFulled:{
         type: Boolean,
        required: true,
        default:false,
    },
    date:{
        type: Number,
        default: 0,
     },
    stationId:{
        required: true,
        type:String,
        default:0,
   },
   vehicleType:{
        type: String,
        default:"",

   }
    







})

const User = mongoose.model("User", userSchema);
module.exports  = User;
