var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var env = process.env.NODE_ENV || 'development';
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var whitelistJson = require('./config/whitelist.json');

var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(function(req, res, next) {
  var whitelist;
  var origin = req.headers.origin;
  
  if(env != 'development'){
    whitelist = whitelistJson.whitelist;
    if (whitelist.indexOf(origin) > -1) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  }
  
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Range');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Access-Control-Allow-Origin'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (req.method == 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/static', express.static(__dirname+'/public'));

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
