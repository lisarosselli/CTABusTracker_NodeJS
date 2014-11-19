var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var mongodb = require('mongodb');

var routes  = require('./routes/index');
var users = require('./routes/users');
var test = require('./routes/test');
var cta_api = require('./routes/cta_api');
var cta = require('./routes/cta');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// pretty print jade html output
app.locals.pretty = true;


// disabled jade by commenting out the above 2 lines
// enabling static serving of html with the below line2
//app.set("view options", {layout: false});
//app.set('view engine', '.html');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/test', test);
app.use('/cta_api', cta_api);
app.use('/cta', cta);


// testing some mongodb stuff
//console.log(mongodb.Server);
//console.log(mongodb.MongoClient);

var mdbServer = new mongodb.Server('localhost', 3000, { poolSize: 5 });
var client = new mongodb.MongoClient(mdbServer, {retryMiliSeconds : 5000});
console.log(client);


// /testing mongodb stuff


//------- testing routing and requests
app.get('/searching', function(req, res){
    var val = req.query.search;
    console.log(val);

    var url = "http://www.ctabustracker.com/bustime/api/v1/getroutes?key=dcBun75XjwhPmnAkv8tQFa2xb";
    console.log(url);

    request(url, function(err, resp, body) {
        if (err) {
            res.send(err);
            return;
        }

        //var j = xmlToJSON.parseString(body);
        //console.log(xmlToJSON);
        //console.log(xmlToJSON.parseString());
        console.log(body);
        res.send(body);
    });

    //res.send("WHEEE");
});

// end testing routing and requests





/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    req.params.mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(req.headers['user-agent'])) ? true : false;
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
