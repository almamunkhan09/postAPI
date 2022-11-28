// importing the necessary packages in the application

const { response } = require('express');
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

//importing routes 

const userReg = require('./routes/ userRegistration')

// declaration of enviornmental variables 
const PORT = process.env.PORT;
const MONGOURI = process.env.MONGOURI;


// connection with database
mongoose.connect(MONGOURI).then(()=>{
    console.log('Database is connected successfully');
}).catch(err => console.log(err));




// Error handling 

function errorHandler (error,req,res,next){
    if(error){
        res.json({message: 'Problem with the Server'});
        
    };
    next();
}


app.use(express.json());



//
// Application main route
app.get('/',(req,res)=> {
    res.status(200).json({success: 'Application is running'});
});

app.use('/user',userReg);

// initiate the application at port 
app.listen(PORT,err => {
    if (err) throw err;
    console.log(`The application is running at port ${PORT}`);
});

app.use(errorHandler);

