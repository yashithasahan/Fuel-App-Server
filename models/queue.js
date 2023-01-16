const mongoose = require('mongoose');

const queueSchema = mongoose.Schema({
    userId:{
        type:String,
        required: true,
    },
    isInQueue:{
        type: Boolean,
        default: false,
    },
    isFueled:{
        type: Boolean,
        default: false,
    },
    duration:{
        type: Number,
        default: false,
    },
   

});

module.exports = queueSchema;

