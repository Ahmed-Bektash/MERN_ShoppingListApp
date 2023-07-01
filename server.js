import express, { json } from 'express';
import { connect } from 'mongoose';
import { resolve } from 'path';
import dotenv from 'dotenv'

dotenv.config();
// import { ErrorTypes,ErrorResponse } from './utils';
import { ErrorResponse, ErrorTypes } from './utils/utils.js';
//requiring the routes: it's kept in a separate folder to be clean.
import items from './routes/api/items.js';
import users from './routes/api/users.js';

//initialize the app
const app = express();

//body parser middleware
app.use(json());

//configure DB
/*
1- create a config folder 
2- create a keys.js file
3- create a mongodb account
4- create a project
5- create a cluster 
6- create a database which will force you to create a collection which will force you to create a user.
7- copy the db connection string URI from the connect modal that will open
8- replace password with user password that you created for the DB
9- here you can connect the keys file (which exports the URI)
10-connect to mongo using the mongoose with your URI
*/
async function ConnectDBs(){  
    try {
        const db = process.env.MONGO_URI;
        connect(db,{
            useNewUrlParser: true, 
            // useCreateIndex: true,
            useUnifiedTopology: true,
            // useFindAndModify: false 
            dbName:process.env.DB_NAME
        }).then(()=>console.log('Mongo db connected')) 
        .catch(err=> console.log('Mongo cannot connect'));
    
    } catch (error) { 
      //server crashing
      console.log("There is an error in connecting to DB",error.message);
      process.exit(1)
    }   
  }
  

    //middleware for all apis to make sure all routes with this url will go to a routing handler.
app.use('/api/items',items);
// app.use('/api/items',lists);
app.use('/api/users',users);

//serve the static assets here if we are in production (there is a post build script that will serve them)
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req,res)=>{
        res.sendFile(resolve(__dirname,'client','build','index.html'));
    });
}

//set up ports and server init
const port = process.env.PORT || 5000;

app.listen(port, async()=>{
    console.log(`server started on port ${port}`);
    await ConnectDBs();
}); 

process.on("unhandledRejection",(error)=>{ //this also takes a promise with the error 
    console.log("There is an error",error);
    server.close(()=>process.exit(1)); //1 means error 
  });

app.all('*',(req,res,next)=>{
    const path = req.url
    const method= req.method
    next(new ErrorResponse(`page not found on url ${path} for ${method}`,ErrorTypes.RESOURCE_NOT_FOUND))
    res.end();
  })

//publish on https://dashboard.render.com/
