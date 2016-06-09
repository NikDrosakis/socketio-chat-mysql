# socketio_chat
a socketio chat mysql application

<h2>SETUP</h2>

1. Create Database niklab
2. Run <a href="https://github.com/NikDrosakis/socket.io-chat-mysql/blob/master/chat/chat.sql">chat.sql</a>
3. Edit <a href="https://github.com/NikDrosakis/socket.io-chat-mysql/blob/master/chat.server.js">chat.server.js</a> file adding mysql host, username, password. Replace test.gr with server's host at chat.server.js, chat.js files
4. install nodejs if not already installed in your system
5. Run <b>npm install</b> command line to install all the necessary node-modules from package.json
6. Run <b>node chat.server.js</b> command line to connect socket (by default at port 3000)
7. Open webpage [host]:3000/chat.html to run the chat 
8. Open webpage [host] to run chat embedded in index.php or include iframe to any file (changing host iframe src)

<img src="https://github.com/NikDrosakis/socket.io-chat-mysql/blob/master/capture.JPG">

<h2>TODO</h2>
- multiusers list from db
- user images 
- display writing... effect
- multiple chat
