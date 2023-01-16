const jwt = require('jsonwebtoken');

const auth = async (req, res, next) =>{
    try{
        const token = req.header('x-auth-token');
        if(!token)
        return res.status(401).json({msg:'Access denied. No auth token'});

        const verfied = jwt.verify(token, 'passwordKey');
        if(!verfied) return res.status(401).json({msg:'Token verification failed'}); 

        req.user = verfied.id;
        req.token = token;
        next();
    }catch (err){
        res.status(500).json({error: err.message});
    }
    
};

module.exports = auth;