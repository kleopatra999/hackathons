

/* In step 7 we demonstrate a simple ng-repeat loop. Need index.html, app.js and server.js
assign json data directly to $scope in controller code
*/




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




app.listen(port, function() {
    console.log('aOne step07 listening on port ' + port)

});
