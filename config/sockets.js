module.exports = function(app) {

	var io = require('socket.io').listen(app);

	// TODO 
	// Save messages on a database

	var messages = [];

	var users = [];

	io.sockets.on('connection', function (socket) {

		socket.emit("load:messages",messages);
		socket.emit("load:users",users);
	 	
	  socket.on("user:join",function(data){
	  	console.log("user:join", data);
	  	users.push(data);
	  	socket.broadcast.emit("user:join",data);
	  });

	  socket.on("user:message",function(data){
	    console.log(data);
	    messages.push(data);
	    socket.broadcast.emit("user:message",data);
	    socket.emit("user:message",data);
	  });

	  socket.on("user:quit",function(data){

	  	for(var i in users){
	  		if(users[i] != undefined){
		  		if(users[i]._id == data._id){
		  			users = users.slice(i,0);
		  		}
		  	}
	  	};

	  	console.log("USER QUIT : ",users);

	    socket.broadcast.emit("user:quit",data);
	  });

	});

}