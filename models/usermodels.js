const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema ({
    
    userName: {
        type: String,
        required: true,

    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        min: 6,
        max: 10,
        required: true,
    },

});

const User = mongoose.model('User',userSchema);


module.exports = User;

