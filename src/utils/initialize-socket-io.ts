import { io, Socket } from 'socket.io-client';
import ClientEvents from '../api/models/eventTypes/ClientEvents';
import ServerEvents from '../api/models/eventTypes/ServerEvents';
import environment from "../environments/environment";


const BASE_SOCKET_URL = `http://${environment.API_HOST}:${environment.API_PORT}`;

let socket: Socket<ServerEvents, ClientEvents>;

export default function getSocket(): Socket<ServerEvents, ClientEvents> {
  if (!socket) {
    socket = io(BASE_SOCKET_URL, { jsonp: false });
  }

  return socket;
}
