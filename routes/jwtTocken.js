const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const User = require('../models/usermodels');








const varify = async function(req,res,next){
    try{
        const user = await User.findOne({email: req.body.email});
        if (!user){

            return res.status(200).json({message: 'email or password is invalid'})
        }

        const match = await bcrypt.compare(req.body.password,user.password);
        if (!match){
            return res.status(200).json({message: 'email or password is invalid'});
        }

        const token =  jwt.sign({ username: user.username,email: user.email }, 'khan0902044',{ expiresIn: 60 * 60 },{ algorithm: 'RS256'})
        return res.status(200).json({tocken: token,message: 'you are loged in'});
        

        
        

    }
    catch(error){
        console.log(error)
        res.json({message: error});

    }

}


router.route('/').post(varify);





module.exports = router;


