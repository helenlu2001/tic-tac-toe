import socketIOClient from "socket.io-client";
const endpoint = 'localhost:4001';
export const socket = socketIOClient(endpoint);
