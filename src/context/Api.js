import axios from 'axios'



const BaseUrl = axios.create({baseURL:'https://chat-app-backend-gray-eight.vercel.app'});

export default BaseUrl;
