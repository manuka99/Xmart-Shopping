const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');



//const { resetPassword } = require('../routes/auth');
const UserSchema = new mongoose.Schema(
    {
       
        firstname: {
            type: String,
            required:[true, "Please provide first name"]  // validations
        },


       lastname: {
            type: String,
            required:[true, "Please provide last name"]  // validations
        },

        username: {
            type: String,
            required:[true, "Please provide a username"]  // validations
        },

        email: {
            type: String,
            required:[true, "Please provide an email"] ,   // validations
            unique: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide a valid email",
              ],
            },

            telephone: {
                type: String,
                required:[true, "Please provide a telephone number"] , //validations
                
            },
    
    

            password: {
                type: String,
                required: [true,"Please provide a password"], // validations
                minlength:6,
                select:false   // to avoid passing the password when quering unless specifically asked for it.
            },


            userrole: {
                type: String,
                required:[true, "Please provide the role"]  // validations
            },
    

            resetPasswordToken: String,
            resetPasswordExpire: Date
    }
);


UserSchema.pre("save", async function(next){  //
    if (!this.isModified("password")){
        next();
    }

const salt = await bcrypt.genSalt(10);    // await bcz it returns a promise
this.password = await bcrypt.hash (this.password,salt); // this refers to password in controller/auth.js
// Change the password that was sent, save  the new password in password field

next();

});


UserSchema.methods.matchPasswords = async function (password) 
{
    return await bcrypt.compare (password, this.password);    // comparing passwords
};

UserSchema.methods.getSignedJwtToken =  function ()
{
   return jwt.sign({id:this._id}, process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRE}); //
};

UserSchema.methods.getResetPasswordToken = function()
{
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 10* (60*1000);// 10 mins  //Reset Password token  expires on 10 mins
    return resetToken;
}



const User = mongoose.model("User",UserSchema);
module. exports = User;