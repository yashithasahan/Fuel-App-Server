const mongoose = require('mongoose');
const queueSchema = require('./queue');

const stationSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    city:{
        type: String,
        required: true,
        trim: true,
    },
    district:{
        type: String,
        required: true,
        
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    regId:{
        type: Number,
        required: true,
        
    },


    isPetrolAvailable:{
        type: Boolean,
        required: true,
    },
    petrolVolume:{
        type: Number,
        default: 0,
    },
    petrolDate:{
        type: Number,
        default: 0,

    },
    dieslVoulme:{
        type: Number,
        default: 0,
    },
    isDieselAvailable:{
         type: Boolean,
        required: true,
    },
    dieslDate:{
        type: Number,
        default: 0,
     },
    userId:{
        required: true,
        type:String,

    },
    queue:[queueSchema],


});
const Station = mongoose.model('Station', stationSchema);
module.exports = Station;