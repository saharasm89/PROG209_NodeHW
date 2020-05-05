var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var saharastuff = require('./routes/sahararoute');
// not using node's routes for multiple sites
//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// not using the fancy directory re-direct
//app.set('views', path.join(__dirname, 'views'));

// view engine setup
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// not using
//app.use(express.static(path.join(__dirname, 'public')));

// not using routes
//app.use('/', routes);
//app.use('/users', users);

// just one "site" with 2 pages, / and about
app.use('/saharaItems',saharastuff);

// use res.render to load up an ejs view file
// index page 
app.get('/', function(req, res) {
    res.render('pages/saharaItems');
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// I added back the previous error page 
app.get('/error', function(req, res) {
    // should get real data from some real operation, but instead ...
    let message = "some text from someplace";
    let error ={
        status: "this is real bad",
        stack: "somebody called somebody who called somebody"
    };
    res.render('pages/error', {  // pass the data to the page renderer
        message: message,
        error: error
    });
});



app.listen(8080);
console.log('3000 is the magic port');

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });


module.exports = app;
