const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const passport = require('passport');
const session = require("express-session");
const multiparty = require('connect-multiparty');
multipartyMiddleware = multiparty();

const router = require('./server/routers');
const setUpPassport = require('./server/setuppassport.js');

let app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:root@ds145138.mlab.com:45138/transactions');

setUpPassport();

app.use(express.static(path.join(__dirname , '/client')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.use(session({
    secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',router);

app.listen(3000,function(){
    console.log("Server is started at 3000 port");
})
