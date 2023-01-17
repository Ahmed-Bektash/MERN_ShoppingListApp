import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema; //capital S

import ListSchema from './list.js'

//creating schema basically means what the data should look like when saved.
const UserSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        enum: ['admin', 'normal','paid']
    },
    reset_password_token:{
        type:String
    },
    reset_password_expire_time:{
        type:String
    },
    Lists:{
        type:[ListSchema]
    },
    date:{
        type: Date, //capital D
        default: Date.now //current date of creation
    }
    
});

//exporting the model and schema
module.exports = User = mongoose.model('user',UserSchema);