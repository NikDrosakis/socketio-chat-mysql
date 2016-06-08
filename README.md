# socketio_chat
a mysql chat socketio implemention with embedded socket.io in php file.

socketio in mysql chat implementation

<h2>INSTALLATION</h2>

1. Create Database 
2. Run chat.sql
3. Edit chat.server.js file adding mysql host, username, password. Replace test.gr with server's host at chat.server.js, chat.js files
4. install nodejs if not already installed in your system
5. Run <b>npm install</b> to install all the necessary node-modules from package.json
6. Run node chat.server.js to connect socket (by default at port 3000)
7. Open webpage [host]:3000/chat.html to run the chat 
8. Open webpage [host] to run chat embedded in index.php or include iframe to any file (changing host iframe src)
