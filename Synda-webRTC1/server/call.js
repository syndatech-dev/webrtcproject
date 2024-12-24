function initiateCall(socket, data) {
    socket.to(data.to).emit('signal', { from: socket.id, signal: data.signal });
}

module.exports = { initiateCall };
