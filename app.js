
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var list = require('./routes/list');
var http = require('http');
var path = require('path');
var nano = require('nano');

var app = express();

GLOBAL.nano = nano('https://' + process.env.CLOUDANT_USER + ':' + process.env.CLOUDANT_PASS + '@jenit.cloudant.com');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/new', list.new);
app.get('/:list', list.show);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
