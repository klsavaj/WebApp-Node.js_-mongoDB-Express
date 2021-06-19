require('dotenv').config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const signupSchema =new mongoose.Schema({
    username: {
        unique:true,
        type: String,
        required: true,
        minLength: 2
    },
    email: {
        unique:true,
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Id!!!!")
            }
        }
    },
    password:{
        type: String,
        required: true,
    },
    confirm_password:{
        type: String,
        required: true,
    },

    date:{
        type:Date,
        default:Date.now
    },
    tokens:[{
        token:{
            type:String,
            required:true,

        }
    }
       
    ]
});


// Process for getting token
// Below, "methods" is used when you are working with a particular instance rather than direct collection.
signupSchema.methods.getAuthToken = async function() {
    try {
        const token = jwt.sign({ _id:this._id.toString()},"YouHaveToWriteSecretKeyHereHavingMinimum32Characters");
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
     
    } catch (error) {
        res.send("error is like this : " + error);
    }
}


///// Creating password in to hash
signupSchema.pre("save", async function(next){

    if (this.isModified("password")) {
        // const passwordHash = await bycript.hash(password,10);    ///Just an example
        this.password = await bcrypt.hash(this.password,10);
        this.confirm_password = await bcrypt.hash(this.confirm_password,10);
    }
    
    next();
 
})


//->Collection
const SignUpUser = mongoose.model('SignUpUser', signupSchema);

module.exports = SignUpUser;