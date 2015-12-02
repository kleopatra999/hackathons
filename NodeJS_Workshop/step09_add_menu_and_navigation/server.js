
'use strict'

var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')
  
var port = process.env.PORT;

var app = express()

app.use(bodyParser.json());
app.use(express.static(__dirname))

app.get('/', function(req,res){
	res.send('index.html')
})


require('./scripts/API/itemAPI.js')(app)
require('./scripts/API/offerAPI.js')(app)
require('./scripts/API/commentAPI.js')(app)
require('./scripts/API/userAPI.js')(app)




app.listen(port, function() {
    console.log('aOne Step09 listening on port ' + port)

});
