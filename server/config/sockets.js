const timeoutHandlers = require('./socket-handlers/timeouts')
const realtimeChangeHandlers = require('./socket-handlers/realtime-changes');
module.exports = function(io) {
	io.on('connection', (socket) => {
		timeoutHandlers(socket, io);
		realtimeChangeHandlers(socket, io);
	})
}

// socketUserLookup stores pairs in the form { socket.id: userId }
// It must be edited on each login and logout
/*
let socketUserLookup = {};

let timer;
const LOG_TIMEOUT_QUEUE_INTERVAL = 2000
const TIMEOUT_MILLIS = 10 * LOG_TIMEOUT_QUEUE_INTERVAL


function findSocket(userId) {
	let one = Object.keys(socketUserLookup).filter(key => {
		return (socketUserLookup[key] === userId)
	});
	return one[0];
}

module.exports = function (io) {
	let processQueue = function (socket) {
		Timeouts.Queue()
			.then(queue => {
				if (!queue.peek()) {
					clearInterval(timer);
					return;
				}
				let timeDiff = Date.now() - Date.parse(queue.peek().loginTime);
				console.log('timeDiff', timeDiff);
				if (timeDiff > TIMEOUT_MILLIS) {
					io.sockets.to(findSocket(queue.peek().user._id.toString())).emit('timeoutOccurred', 'stuff');
					//findSocket(queue.peek().user.toString());
				}
			});
	}

	io.on('connection', (socket) => {

		socket.on('userConnected', (userId) => {
			Timeouts.Queue()
				.then(queue => console.log(queue))
				.then(() => {
					socketUserLookup[socket.id] = userId;
					if (!timer || !timer._onTimeout) {
						timer = setInterval(processQueue, LOG_TIMEOUT_QUEUE_INTERVAL);
					}
				})
				.catch(console.log);
		});

		socket.on('triggerTimeout', () => {
			console.log('Time out occurred')
			socket.emit('timeoutOccurred', 'ignored');
		});

		socket.on('userLogout', () => {
			Timeouts.Queue()
				.then(queue => {
					delete socketUserLookup[socket.id];
					if (!queue.users || !queue.users.length) {
						console.log('stopping process queue')
						clearInterval(timer);
						//console.log(timer);
					}
					//console.log(socketUserLookup);
				})
				.catch(console.log);
		});

		socket.on('timeoutAll', () => {
			Timeouts.Queue()
				.then(queue => {
					Object.keys(socketUserLookup)
						.forEach(socketId => {
							console.log(socketId)
							let socket = socketUserLookup[socketId]
							io.sockets.to(socketId).emit('timeoutOccurred')
						})
					return queue;
				})
				.then(queue => queue._clearAll())
				.then(() => User.updateMany({isActive: true}, {isActive: false}))
				.catch(console.log)
		})
	});
}
*/
