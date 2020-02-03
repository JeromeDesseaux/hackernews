import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import mongoose from "mongoose";
import bodyParser from "body-parser";
require('dotenv').config(); 

const env = process.env.NODE_ENV || "dev";

const database = env == "test" ? process.env.TEST_DATABASE : process.env.DATABASE;
const mongoString = process.env.MONGODB_URL + database;

mongoose.connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const app = express();

if(env == "dev"){
    app.use(logger('dev'));
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);

export default app;