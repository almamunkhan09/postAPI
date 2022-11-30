// importing the necessary packages in the application

const { response } = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport')


// declaration of enviornmental variables 
require('dotenv').config();
const PORT = process.env.PORT;
const MONGOURI = process.env.MONGOURI;


//importing routes 

const userReg = require('./routes/ userRegistration')
const login = require('./login')

//Setting up ejs
app.set('view engine', 'ejs');


// connection with database
mongoose.connect(MONGOURI).then(() => {
    console.log('Database is connected successfully');
}).catch(err => console.log(err));



// Creating seesion in this app

app.use(session({
    secret: process.env.secret,
    saveUninitialized: true, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: MongoStore.create({
        mongoUrl: process.env.MONGOSESSION,
        touchAfter: 24 * 3600 // time period in seconds
    }),
    cookie: { maxAge: 1000 * 24 * 3600 }
}));

 app.use(passport.initialize());
 app.use(passport.session());

//app.use(passport.authenticate('session'));



// Error handling 

function errorHandler(error, req, res, next) {
    if (error) {
        res.json({ error: error });

    };
    next();
}


app.use(express.json());



//
// Application main route
app.get('/', (req, res) => {
    //res.render('login');
    res.status(200).json({ success: 'Application is running' });
});

app.use('/user', userReg);

app.use('/login',login)

// initiate the application at port 
app.listen(PORT, err => {
    if (err) throw err;
    console.log(`The application is running at port ${PORT}`);
});

app.use(errorHandler);

