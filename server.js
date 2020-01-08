console.log("server is running");

var express = require("express"); //store the EXPRESS module in a variable

var app = express(); //run the EXPRESS code in APP varible

var port = 3000; //create a port to comunicate between client and server

app.use(express.static('public'));

var server = app.listen(port);

console.log("http://localhost:" + port);
