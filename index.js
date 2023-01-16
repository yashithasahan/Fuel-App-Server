const express = require('express');
const mongoose = require('mongoose');

const authRouter  = require('./routes/auth.js');
const ownerRouter = require('./routes/owner.js');
const stationRouter = require('./routes/station.js');

const PORT =process.env.PORT || 3000;
const app = express();
const DB = "mongodb+srv://yashitha:yash1234@cluster0.vtrkmpc.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use(authRouter);
app.use(ownerRouter);
app.use(stationRouter);

mongoose
.connect(DB)
.then(()=>{
    console.log("connection succesfull");
})
.catch((e)=>{
    console.log(e);
});


app.listen(PORT,"0.0.0.0",  () => {
    console.log(`connectd at port ${PORT} `)
});