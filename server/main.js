const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fromEvent = require('rxjs').fromEvent;
const configureStore = require('./modules').configureStore;

app.use(express.static('/home/masterchief/Documents/firebase-practice/build'));
server.listen(8000, () => {
  console.log('waiting for connection')
});


const socket = fromEvent(io, 'connection')

const { store, subscribeToStore } = configureStore({}, true);

module.exports = {
  store, 
  socket,
  subscribeToStore,
  io,
};
