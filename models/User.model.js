import mongoose from "mongoose";
import { Schema } from "mongoose";
import validator from "validator";

/* User Model */
const userShema = new Schema({
    username : {
        type:String,
        required:true,
        unique:true,
        validate: [
            {
            validator : (value) => validator.isAlphanumeric(value),
            message: "Username can only letters (a-zA-Z).",
        },
        {
            validator: (value) => validator.isLength(value, {min:5, max:20}),
            message:" must be at least 5 and at most 20 characters long",
        }]
    },
    email : {
        type:String,
        required:true,
        unique:true,
        validate : {
            validator: validator.isEmail,
            message: "Please fill a valid email address",
        }
        },
                
    password : {
        type:String,
        required:true,
        validate : [
         {
            validator: validator.isStrongPassword,
            message: "Please fill a valid password",
        },
    ]
    },

    confirmPassword : {
        type:String,
        required:true,
        validate : {
            validator: validator.isStrongPassword,
            message: "Please fill a valid confirmPassword",
        }
    },

},{timestamps:true});

const User =  mongoose.model("user",userShema);

export default User;