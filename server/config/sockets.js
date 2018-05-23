const Timeouts = require('mongoose').model('Timeouts');

// socketUserLookup stores pairs in the form { socket.id: userId }
// It must be edited on each login and logout
let socketUserLookup = {};

let timer;
const TIMEOUT_MILLIS = 100 * 2 * 1000


function findSocket(userId) {
	let one = Object.keys(socketUserLookup).filter(key => {
		return (socketUserLookup[key] === userId)
	});
	return one[0];
}

module.exports = function (io) {
	let processQueue = function (socket) {
		//console.log('processing');
		Timeouts.Queue()
			.then(queue => {
				if (!queue.peek()) {
					clearInterval(timer);
					return;
				}
				let timeDiff = Date.now() - Date.parse(queue.peek().loginTime);
				console.log('timeDiff', timeDiff);
				if (timeDiff > TIMEOUT_MILLIS) {
					io.sockets.to(findSocket(queue.peek().user._id.toString())).emit('timeoutOccurred');
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
						timer = setInterval(processQueue, 2000);
					}
				})
				.catch(console.log);
		});

		socket.on('triggerTimeout', () => {
			socket.emit('timeoutOccurred', 'ignored');
		});

		socket.on('userLogout', () => {
			Timeouts.Queue()
				.then(queue => {
					//console.log(queue.users)
					return queue;
					//return queue.removeUserOnLogout(socketUserLookup[socket.id]);
					//return queue.clearAll();
				})
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
	});
}
