const jwt = require('jsonwebtoken');
const User= require('../models/user');
const owner = async(req,res,next)=> {
    try{
        const token = req.header('x-auth-token');
        if(!token)
        return res.status(401).json({msg:'Access denied. No auth token'});

        const verfied = jwt.verify(token, 'passwordKey');
        if(!verfied) return res.status(401).json({msg:'Token verification failed'}); 
        
        const user = await User.findById(verfied.id);
        if(user.type == 'false'){
            return res.status(401).json({msg:"You are not a owner!"});
        }
        req.user = verfied.id;
        req.token = token;
        next();
    }catch (err){
        res.status(500).json({error: err.message});
    
    }
        
    
};

module.exports = owner;