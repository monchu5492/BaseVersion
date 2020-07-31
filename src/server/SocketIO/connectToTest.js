import io from 'socket.io-client';

const connectToTestSocket = () => (dispatch) => {
  alert('Hello world');
  dispatch({ type: 'CONNECTING' });

  const socket = io('/message-socket');

  socket.on('connect', () =>
    dispatch({ type: 'CONNECTED', id: socket.id }));

  socket.on('message', (message, user) =>
    dispatch({ type: 'NEW_MESSAGE', message, user }));
};

export default connectToTestSocket;
