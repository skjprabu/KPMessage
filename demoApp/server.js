// Invoke 'strict' JavaScript mode
'use strict';

// Load the 'express' module
var express = require('express');
var fs = require('fs');

// Create a new Express application instance
var app = express();

app.use(express.static(__dirname + '/app')); // set the static files location /public/img will be /img for users

// Log service
app.get('/log', function (req, res) {
    if (req.param('message')) {
        fs.appendFile('trace.txt', req.param('message') + '\n', function (err) {
            if (err) return console.log(err);
        });

        res.status(200);
        res.send("logged \"" + req.param('message') + "\"");
    }
    else {
        res.status(400);
        res.send("Message parameter is missing");
    }
});

// Login service
app.get('/login', function (req, res) {
    res.status(200);
    res.send("login");
});

// Logout service
app.get('/logout', function (req, res) {
    res.status(200);
    res.send("logout");
});


// Use the Express application instance to listen to the '3000' port
app.listen(3000);

// Log the server status to the console
console.log('Server running at http://localhost:3000/');

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;