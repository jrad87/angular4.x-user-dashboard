const Timeouts = require('mongoose').model('Timeouts');
const User = require('mongoose').model('User');

let socketUserLookup = {};

let timer;
const LOG_TIMEOUT_QUEUE_INTERVAL = 5000
const TIMEOUT_MILLIS = 20 * LOG_TIMEOUT_QUEUE_INTERVAL


function findSocket(userId) {
	let one = Object.keys(socketUserLookup).filter(key => {
		return (socketUserLookup[key] === userId)
	});
	return one[0];
}

module.exports = function(socket, io){
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
                    io.sockets
                        .to(findSocket(queue.peek().user._id.toString()))
                        .emit('timeouts::timeoutOccurred', 'stuff');
                    //findSocket(queue.peek().user.toString());
                }
            });
    }
    socket.on('timeouts::userConnected', (userId) => {
        Timeouts.Queue()
            .then(() => {
                socketUserLookup[socket.id] = userId;
                if (!timer || !timer._onTimeout) {
                    timer = setInterval(processQueue, LOG_TIMEOUT_QUEUE_INTERVAL);
                }
            })
            .catch(console.log);
    });
    socket.on('timeouts::triggerTimeout', () => {
        console.log('Time out occurred')
        socket.emit('timeouts::timeoutOccurred', 'ignored');
    });
    socket.on('timeouts::userLogout', () => {
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
    socket.on('timeouts::timeoutAll', () => {
        Timeouts.Queue()
            .then(queue => {
                Object.keys(socketUserLookup)
                    .forEach(socketId => {
                        let socket = socketUserLookup[socketId]
                        io.sockets.to(socketId).emit('timeouts::timeoutOccurred')
                    })
                return queue;
            })
            .then(queue => queue._clearAll())
            .then(() => User.updateMany({isActive: true}, {isActive: false}))
            .catch(console.log)
    });
}