const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8000;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const sessionConfig = {
	saveUninitialized: true,
	resave: false,
	rolling: true,
	name: 'currentUser',
	secret: 'klkmjkjnjkjnsa',
	cookie: {
		httpOnly: false,
		secure: false,
		maxAge: 86400 * 1000
	}
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session(sessionConfig));
app.use(cookieParser('klkmklkmklkmklkm'));

app.use(express.static(path.resolve('dist')))



require(path.resolve('server', 'config', 'mdb'));
//require(path.resolve('server', 'config', 'rdb'));
require(path.resolve('server', 'config', 'routes'))(app);
require(path.resolve('server', 'config', 'sockets'))(io);
http.listen(port, () => console.log(`Listening on port ${port}`));
