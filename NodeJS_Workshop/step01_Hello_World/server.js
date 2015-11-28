
'use strict'
var port = process.env.PORT;

var http = require('http')
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/html'})
	res.write('<h1>')
	res.write('Hello World')
	res.write('</h1>')
	res.end()
}).listen(port);	
