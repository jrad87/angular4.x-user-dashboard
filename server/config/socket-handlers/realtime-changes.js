module.exports = function(socket, io) {
    socket.on('realtime::changeOccurred', () => {
        socket.broadcast.emit('realtime::updateData')
    })
}