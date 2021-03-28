import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import indexRouter from './routes/index';
import apiRouter from './routes/api/v1/index';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: '.env' });

var app = express();

let whitelist = ['http://localhost:3000', 'http://localhost:3001']
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    if(!origin) return callback(null, true);
    if(whitelist.indexOf(origin) === -1){
      var message = 'The CORS policy for this origin doesn\'t ' +
                'allow access from the particular origin.';
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, '../public')));

//mongodb connection

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});


//routes

app.use('/', indexRouter);
app.use('/api/v1', apiRouter);
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
      success: false,
      message: err.message,
      error: err
  });
});

export default app;