import { Schema as _Schema, model,SchemaTypes } from 'mongoose';
const Schema = _Schema; //capital S

//creating schema basically means what the data should look like when saved.
const UserSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }, 
    max_lists:{
        type:Number,
        default:50
    },
    max_items_in_list:{
        type:Number,
        default:100
    },
    last_used_list:{
        type: SchemaTypes.ObjectId,
        ref:'list',
        required:false //make true when you add it in the front end
    },
    role:{
        type:String,
        enum: ['admin', 'normal','paid'],
        default:'normal'
    },
    reset_password_token:{
        type:String
    },
    reset_password_expire_time:{
        type:String
    },
    Lists:[{
        type:SchemaTypes.ObjectId,
        ref: 'List',
    }],
    date:{
        type: Date, //capital D
        default: Date.now //current date of creation
    }
    
});

//exporting the model and schema
const User = model('User',UserSchema);
export default User