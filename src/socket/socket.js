import { io } from "socket.io-client"

const ENDPOINT= 'http://localhost:5000';

let socket;
let selectedChatCompare;
socket = io(ENDPOINT)




export default socket
