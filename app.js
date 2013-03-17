var http = require('http');
var fs = require('fs');
var dbh = require('./dbh.js');

var server = http.createServer(function(req,res) {
	fs.readFile(__dirname+"/index.html", function(err,data) {
		if (err) {
			res.writeHead(500);
			return res.end("500: Not able to connect.") 
		} else {
			res.writeHead(200);
			res.end(data)
		}
	});	
}).listen(3000);

var socket = require('socket.io').listen(server);
socket.sockets.on('connection', function (client) {
	dbh.get_chem(function(ch) {
		client.emit('populate', ch);
	});
	client.on('addch', function(data) {
		dbh.add_chem(data, function(lid) {
			dbh.get_chem(function(chs) {
				client.emit('populate',chs)
			});
		});
	});
});
	

