const express = require('express');
const stationRouter = express.Router();
const auth = require('../middlewares/auth');
const Station = require('../models/station');
const Users = require('../models/user');

//get request to search station

stationRouter.get("/api/stations/search/:key", auth, async (req,res)=> {
    try{
        const stations = await Station.find({
            $or:[
            {name: {$regex: req.params.key, $options: "i"}},
            {city: {$regex: req.params.key, $options: "i"}},
            {district: {$regex: req.params.key, $options: "i"}},]
        
        });
        res.json(stations);
        
    }catch (e) {
        
        res.status(500).json({error:e.message});
    }
});

//add queue data
stationRouter.patch("/api/queue-update/:id", auth, async (req,res)=>{
    try{
        const {id,isInQueue,isFuelled,duration,vehicle} = req.body;
        await Users.findByIdAndUpdate(req.params.id, { duration:duration,stationId:id,isInQueue:isInQueue,isFulled:isFuelled,vehicleType:vehicle }, { new: true });
        if (!Users) return res.status(404).json({ msg: 'User not found' });
        res.json(Users);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


//get queue data
stationRouter.get("/api/queue-length/:stationId", auth, async (req,res)=>{
    try{
        const count = await Users.countDocuments({ isInQueue: true ,stationId: req.params.stationId });
        
        const motorCycle = await Users.countDocuments({ isInQueue: true ,stationId: req.params.stationId ,vehicleType:"Motorcycle"});
        const threeweeler = await Users.countDocuments({ isInQueue: true ,stationId: req.params.stationId ,vehicleType:"Threeweeler"});
        const car = await Users.countDocuments({ isInQueue: true ,stationId: req.params.stationId ,vehicleType:"Car Van"});
        const bus = await Users.countDocuments({ isInQueue: true ,stationId: req.params.stationId ,vehicleType:"Bus Lorry"});
        const other = await Users.countDocuments({ isInQueue: true ,stationId: req.params.stationId ,vehicleType:"Ohter"});
        res.json({count,motorCycle,threeweeler,car,bus,other});
        

        
    }catch (e) {
        
        res.status(500).json({error:e.message});
    }
});


// get average waiting time

stationRouter.get("/api/waiting-time/:stationId", auth, async (req,res)=>{
    try{
        
        const Noduration = 0.0;
        const waitingTime =   Users.aggregate([
            {
            $match:{
                    stationId: req.params.stationId,
                    isFulled: true,
                },
            },
           
            {$group:{
                _id:"$stationId",
                avgDuration:{$avg: "$duration"},

            },},
           
        ]).exec((error, data)=>{
            if(error){
                console.log(error);
                res.status(500).json({error:e.message});
            }else{
                if(!data[0]){
                    res.json({waitingTime:Noduration});
                    console.log({waitingTime:Noduration});
                }else{
                    console.log({waitingTime: data[0] ? Number(data[0].avgDuration) : 0.0});
                    res.json({waitingTime: data[0] ? Number(data[0].avgDuration) : 0.0});
                }
            }
        });
        
        
        

        
    }catch (e) {
        
        res.status(500).json({error:e.message});
    }
});






module.exports = stationRouter;


