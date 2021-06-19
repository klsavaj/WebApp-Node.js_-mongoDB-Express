const mongoose = require("mongoose");
const validator = require("validator");


const userschema =new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Id!!!!")
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        min:10
    },
    message: {
        type: String,
        required: true,
        minLength: 0
    },
    date:{
        type:Date,
        default:Date.now
    }
});


//->Collection
const ContactUser = mongoose.model('ContactUser', userschema);

module.exports = ContactUser;