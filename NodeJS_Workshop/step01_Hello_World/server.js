'use strict'

var http = require('http')
var express = require('express')

var port = process.env.PORT;

var app = express()
app.use(express.static(__dirname))

app.get('/', function(req, res) {
	res.send('index.html')
})

app.listen(port, function() {
	console.log('aOne step01 listening on port ' + port)

});
