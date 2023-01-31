import { Schema as _Schema, model,SchemaTypes } from 'mongoose';
const Schema = _Schema; //capital S


//creating schema basically means what the data should look like when saved.
const ListSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    items:[{
        type: SchemaTypes.ObjectId,
        ref:'item',
        required:true
    }],
    type:{
        type:String,
        enum:['shopping','checklist'] //add others when necessary
    },
    user:{
        type:SchemaTypes.ObjectId,
        ref: 'User',
        required:true
    },
    date:{
        type: Date, //capital D
        default: Date.now //current date of creation
    }
    
});

//exporting the model and schema
const List = model('List',ListSchema);
export default List