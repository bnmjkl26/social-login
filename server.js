var express = require('express');
require("./services/passportConfig");
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs");

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

const passport = require("passport");

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

var router = require('./router/main')(app, fs, passport);

var server = app.listen(8880, function(){
    console.log("Express server has started on port 8880")
});