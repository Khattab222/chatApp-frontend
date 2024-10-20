import { io } from "socket.io-client"

const ENDPOINT= 'https://chat-app-backend-gray-eight.vercel.app/';

let socket;
let selectedChatCompare;
socket = io(ENDPOINT)




export default socket
