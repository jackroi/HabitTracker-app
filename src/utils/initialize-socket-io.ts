import { io, Socket } from 'socket.io-client';
import ClientEvents from '../api/models/eventTypes/ClientEvents';
import ServerEvents from '../api/models/eventTypes/ServerEvents';

// TODO .env ???
const BASE_SOCKET_URL = 'http://192.168.1.14:8000';
// const BASE_SOCKET_URL = 'http://192.168.1.136:8000';

let socket: Socket<ServerEvents, ClientEvents>;

export default function getSocket(): Socket<ServerEvents, ClientEvents> {
  if (!socket) {
    socket = io(BASE_SOCKET_URL, { jsonp: false });
  }

  return socket;
}
