var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileupload = require("express-fileupload");

var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
}));
app.use(cors({
    origin: '*'
}));

app.use('/api/v1', apiRouter);

module.exports = app;
