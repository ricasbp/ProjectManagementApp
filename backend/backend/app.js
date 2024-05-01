const indexRouter = require('./routes/index');
const initRouter = require('./routes/init');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
//var mongoDB = 'mongodb+srv://daniel:12345@cluster0.p0ptk.mongodb.net/Cluster0?retryWrites=true&w=majority';
var mongoDB = 'mongodb+srv://ricasbp:ricasbp123@cluster0.4nhih.mongodb.net/PSI_Scrum?retryWrites=true&w=majority';
//var mongoDB = 'mongodb+srv://fffranciscoamaro:UjcLxOOqM44Hniqw@cluster0.hkplc.mongodb.net/Cluster0?retryWrites=true&w=majority';


//var mongoDB = 'mongodb://localhost/database';
//var mongoDB = 'mongodb://127.0.0.1/projetodb';
//var mongoDB = 'mongodb://127.0.0.1/projetoDB';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

var cors = require('cors')
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/init', initRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
