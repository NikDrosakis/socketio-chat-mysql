var express = require('express'),
app = express(),
//var app = require('express')(),
http = require('http').Server(app),
fs= require('fs'),
io = require('socket.io')(http),
mysql = require("mysql"),
connectionsArray    = [],
//create db connection
db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "[PASSWORD]",
  database: "niklab"
  }),
POLLING_INTERVAL = 1500,
	pollingTimer;

//require path
var path = require('path')
app.use(express.static('chat'));
//connect
db.connect(function(err){
	if(err){
		console.log('Error connecting to Db');
		return;
	}
	console.log('Database Connection established');
});

//send the page
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//listen
http.listen(3000, function(){
    console.log('listening on *:3000');
});

var pollingLoop = function () {

	var query = db.query("SELECT fromid,toid,text,DATE_FORMAT(FROM_UNIXTIME(created), '%d/%m/%Y %H:%i') AS created FROM chat WHERE fromid=1 AND toid=6"),
		chatter = []; // this array will contain the result of our db query

	query
		.on('error', function(err) {
			console.log( err );
			updateSockets( err );
		})
		.on('result', function( chati ) {
			// create the loop
			chatter.push( chati );
		})
		.on('end',function(){
			// if sockets connected
			if(connectionsArray.length) {
				pollingTimer = setTimeout( pollingLoop, POLLING_INTERVAL );
				updateSockets({chatter:chatter});
			}
		});

//console.log(chatter)
}

/*
* on connection
*
* */
io.sockets.on('connection', function(socket){
	//send message
	console.log('Number of connections:' + connectionsArray.length);
	// start the polling loop only if at least there is one user connected
	if (!connectionsArray.length) {
		pollingLoop();
	}

	socket.on('chat', function(msg){
	//	console.log(msg)
		io.emit('chat', msg);
	//write in mysql
		var timestamp= Math.floor(Date.now() / 1000);
		var newmes  = {fromid:1,toid:6,text: msg,created:timestamp};
		var query = db.query("INSERT INTO mes_chat SET ?", newmes, function(err, result) {
		//	console.log(query.sql);
			if(err) {console.log(err);}
			socket.emit('chat', { text: msg, created:timestamp });
		});
	});

	socket.on('disconnect', function () {
		var socketIndex = connectionsArray.indexOf( socket );
		console.log('socket = ' + socketIndex + ' disconnected');
		if (socketIndex >= 0) {
			connectionsArray.splice( socketIndex, 1 );
		}
	});

	console.log( 'Socket connected!' );
	connectionsArray.push(socket);

});

/*
*	SEND DATA TO ALL SOCKETS
*
 */
var updateSockets = function ( data ) {
	connectionsArray.forEach(function( tmpSocket ){
	tmpSocket.volatile.emit( 'loop' , data );
	});
};
