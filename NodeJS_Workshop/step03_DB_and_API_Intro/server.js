/* In this step we take server.js from step 2 and build upon it to create the first restful api service*/

/* things to watch in this step - 

 1. Install the required modules - express, body-parser, oracledb
 2. Make sure connect string, ip address etc are correct

 */

'use strict';

var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var oracledb = require('oracledb');
var port = process.env.PORT;
var connectionStr = process.env.DBAAS_DEFAULT_CONNECT_DESCRIPTOR;
var username = process.env.DBAAS_USER_NAME;
var password = process.env.DBAAS_USER_PASSWORD;
var app = express()

app.use(bodyParser.json());
app.use(express.static(__dirname))

app.get('/', function(req, res) {
	res.send('index.html')
})

/*
 * We define a new route /items. First thing we need to do when this route is
 * hit is get a connection, then we fire the sql and finally convert the data to
 * the format our application can consume
 */

app.get('/items', function(req, res) {

	console.log('/items api called')

	oracledb.getConnection({
		user : username,
		password : password,
		connectString : connectionStr
	}, function(err, connection) {
		if (err) {
			console.log('could not get connection')
			console.error(err.message);
			return;
		}
		connection.execute("select * from items", {}, {
			outFormat : oracledb.OBJECT
		}, function(err, result) {
			if (err) {
				console.error(err.message);
				doRelease(connection)
				return;
			}

			console.log('sql executed')
			console.log(result.rows);
			doRelease(connection)
			res.json(result);
		})

	}) // end oracledb.getConnection

	function doRelease(connection) {
		connection.release(function(err) {
			console.log(err)
		})
	}
	; // end doRelease

});

app.listen(port, function() {
	console.log('aOne step03 listening on port ' + port)

});