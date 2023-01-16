const express = require('express');
const ownerRouter = express.Router();
const owner = require('../middlewares/owner');
const Station = require('../models/station')
//Adding Stations
ownerRouter.post('/owner/add-station',owner,async (req,res) =>{
    try{
        const {name,district,city,description,regId,isPetrolAvailable,petrolVolume,petrolDate,dieslVoulme,isDieselAvailable,dieslDate,userId,} = req.body;
        let station = new Station({
            name,
            city,
            district,
            description,
            regId,
            isPetrolAvailable,
            petrolVolume,
            petrolDate,
            dieslVoulme,
            isDieselAvailable,
            dieslDate,
            userId,
            

        });

        station = await station.save();
        res.json(station);
            
        

    }catch (e) {
        res.status(500).json({error:e.message});
    }
});

ownerRouter.get('/owner/get-stations/:id',owner, async(req,res)=> {
    try{
        userid = req.params.id;
        const stations = await Station.find({userId: userid
           
        });
        res.json(stations);
    }catch (e){
        res.status(500).json({error: e.message});
    }
});


ownerRouter.put('/owner/update-petrol-status', owner, async (req, res) => {
  try {
    
    const {fuled,id,petrolDate} = req.body;
    const result = await Station.findByIdAndUpdate(id,{ $set: { isPetrolAvailable: fuled, petrolDate: petrolDate } });
    //console.log(fuled);
    //console.log(id);
    
    console.log("good");
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

ownerRouter.put('/owner/update-diesel-status', owner, async (req, res) => {
  try {
    
    const {fuled,id,dieseldate} = req.body;
    const result = await Station.findByIdAndUpdate(id,{ $set: { isDieselAvailable: fuled, dieslDate: dieseldate } });
    //console.log(fuled);
    //console.log(id);
    
    console.log("good");
    console.log(dieseldate);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


module.exports = ownerRouter;

