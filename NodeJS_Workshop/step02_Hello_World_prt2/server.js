'use strict'

var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')

var port = process.env.PORT;

var app = express()

app.use(express.static(__dirname))

app.get('/',function(req,res){
	res.send('index.html') 
})
 

app.listen(port, function() {
    console.log('aOne step02 listening on port ' + port)

});

