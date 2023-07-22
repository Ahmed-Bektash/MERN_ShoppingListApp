import { Schema as _Schema, model,SchemaTypes } from 'mongoose';
const Schema = _Schema; //capital S


//creating schema basically means what the data should look like when saved.
const ListSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    type:{
        type:String,
        enum:['shopping','notes','checklist'], //add others when necessary
        required:true
    },
    category:{
        type:String,
        required: true
    },
    user:{
        type:SchemaTypes.ObjectId,
        ref: 'User',
        required:false
    },
    date:{
        type: Date, //capital D
        default: Date.now //current date of creation
    }
    
});

//exporting the model and schema
const List = model('List',ListSchema);
export default List