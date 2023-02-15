class SocketSevice {
  connection( socket ) {
    socket.on('disconnect', () => {
      console.log('disconnect socket:', socket.id);
    });

    socket.on('message', ({ sender, content }) => {
      console.log({ sender, content });
      _io.emit('message', { sender, content });
    });
  }
}

export default new SocketSevice();